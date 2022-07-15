<template>
  <q-page class="">
    <q-card>
      <q-card-actions class="q-gutter-md">
        <router-link
          v-if="folderId && parentFolder"
          :to="parentFolder.id"
        >
          Parent: {{parentFolder.name}}
        </router-link>
        <router-link
          v-if="folderId && !parentFolder"
          to="../"
        >
          Parent: /
        </router-link>
      </q-card-actions>
      <q-card-section class="q-gutter-md">
        <div style="font-size: 16pt" v-if="folder">Folder: {{ folder.name }}</div>
        <div style="font-size: 16pt" v-if="!folder">Folder: /</div>
        <q-table
          title="Files"
          :rows="fileList"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <router-link :to="`media/player/${props.row.id}`">{{props.value}}</router-link>
            </q-td>
          </template>
        </q-table>
        <q-table
          title="Folders"
          :rows="folderList"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <router-link :to="props.row.id">{{props.value}}</router-link>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions class="q-mr-sm">
        <q-space/>
        <q-btn
          label="New folder"
          @click="newFolder"
        />
        <q-btn
          label="New file"
          @click="newFile"
        />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="showUploadDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Select file</div>
        </q-card-section>

        <q-card-section>
          <q-file v-model="fileUpload" label="Select file"></q-file>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel" v-close-popup></q-btn>
          <q-btn label="Ok" @click="uploadFile" :disable="!fileUpload"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref, toRef} from 'vue';
import {
  ApiError,
  CollectionModelFile,
  CollectionModelFolder,
  EntityModelFile, EntityModelFolder,
  FileEntityControllerService, FileResponse, FileSearchControllerService,
  FolderEntityControllerService, FolderResponse, FolderSearchControllerService
} from 'src/clients/generated';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import followLink from 'src/clients/hateoas-link-follower';
import uploadFileContent from 'src/clients/file-uploader';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  props: {
    folderId: {
      required: false,
      type: String,
      default: () => null
    },
  },
  setup(props) {
    const $q = useQuasar()
    const router = useRouter()
    const showUploadDialog = ref(false);
    const fileUpload = ref<File | null>(null);
    const fileList = ref<FileResponse[]>([])
    const folderList = ref<FolderResponse[]>([])
    const parentFolder = ref<EntityModelFolder | null>(null)
    const folder = ref<EntityModelFolder | null>(null)
    const folderId = toRef(props, 'folderId');
    const columns = ref([
      {
        name: 'name',
        required: true,
        label: 'name',
        align: 'left',
        field: (row: EntityModelFile | EntityModelFolder) => row.name,
        format: (val: string) => `${val}`,
        sortable: true
      },
    ])
    function newFolder() {
      $q.dialog({
        title: 'New folder',
        message: 'folder name:',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        createFolder(data)
      })
    }
    function newFile() {
      fileUpload.value = null;
      showUploadDialog.value = true;
    }
    async function uploadFile() {
      const file = fileUpload.value;

      if (!file) {
        throw new Error('file is null')
      }

      const response = await FileEntityControllerService.postCollectionResourceFilePost({
        name: file.name,
        contentMimeType: file.type,
        parent: folder.value?._links?.self.href || undefined
      })

      const contentLink = response._links?.content.href;
      if (!contentLink) {
        throw new Error('content link is null')
      }

      await uploadFileContent(contentLink, file);

      await refetch();

      fileUpload.value = null;
      showUploadDialog.value = false;
    }
    async function createFolder(name: string) {
      await FolderEntityControllerService.postCollectionResourceFolderPost({
        name,
        parent: folder.value?._links?.self.href
      })
      await refetch();
    }
    async function refetch() {
      if (!folderId.value) {
        folder.value = null;
        parentFolder.value = null;
        const childFiles = await FileSearchControllerService.executeSearchFileGet()
        fileList.value = childFiles._embedded?.files || []
        const childFolders = await FolderSearchControllerService.executeSearchFolderGet();
        folderList.value = childFolders._embedded?.folders || []
      } else {
        folder.value = await FolderEntityControllerService.getItemResourceFolderGet(folderId.value)
        const parentUrl = folder.value._links?.parent.href;
        if (!parentUrl) {
          throw new Error('parent url is null');
        }
        parentFolder.value = await followLink<EntityModelFolder>(parentUrl)
          .catch((e: ApiError) => {
            if (e.status === 404) {
              return null;
            }
            throw e;
          })
        const childFolders = await followLink<CollectionModelFolder>(folder.value._links?.childs.href || '');
        folderList.value = childFolders._embedded?.folders || [];

        const childFiles = await followLink<CollectionModelFile>(folder.value._links?.files.href || '');
        fileList.value = childFiles._embedded?.files || [];
      }

    }
    async function goToParent() {
      if (parentFolder.value) {
        router.push({name: 'folderWithId', params: {folderId: parentFolder.value.id}})
      } else {
        router.push({name: 'rootFolder'})
      }
    }
    return {
      fileList,
      folderList,
      folder,
      columns,
      refetch,
      goToParent,
      newFolder,
      showUploadDialog,
      fileUpload,
      newFile,
      uploadFile,
      parentFolder
    };
  },
  watch: {
    folderId: {
      handler: async function () {
        await this.refetch()
      },
      immediate: true
    }
  }
});
</script>
