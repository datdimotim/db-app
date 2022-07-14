<template>
  <q-page class="">
    <q-card>
      <q-card-actions class="q-gutter-md">
        <q-btn
          v-if="folderId"
          label="parent"
          @click="goToParent"
        />
        <div style="font-size: 16pt">Folder: {{ folder.name }}</div>
      </q-card-actions>
      <q-card-section class="q-gutter-md">
        <q-table
          title="Files"
          :rows="fileList"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <q-badge
                :label="props.value"
                @click="openFile(props.row)">
              </q-badge>
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
              <q-badge
                :label="props.value"
                @click="openFolder(props.row)"
              />
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
  FileEntityControllerService, FileResponse,
  FolderEntityControllerService, FolderResponse
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
    const folder = ref<EntityModelFolder>({})
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
        parent: folder.value._links?.self.href
      })
      await refetch();
    }
    async function refetch() {
      if (!folderId.value) {
        folder.value.name = '/'
        const childFiles = await FileEntityControllerService.getCollectionResourceFileGet1();
        fileList.value = childFiles._embedded?.files || []
        const childFolders = await FolderEntityControllerService.getCollectionResourceFolderGet1();
        folderList.value = childFolders._embedded?.folders || []
      } else {
        folder.value = await FolderEntityControllerService.getItemResourceFolderGet(folderId.value)

        const childFolders = await followLink<CollectionModelFolder>(folder.value._links?.childs.href || '');
        folderList.value = childFolders._embedded?.folders || [];

        const childFiles = await followLink<CollectionModelFile>(folder.value._links?.files.href || '');
        fileList.value = childFiles._embedded?.files || [];
      }

    }
    function openFolder(folder: EntityModelFolder) {
      router.push({name: 'folderWithId', params: {folderId: folder.id}})
    }
    function openFile(file: EntityModelFile) {
      router.push({name: 'mediaPlayer', params: {fileId: file.id}})
    }
    async function goToParent() {
      const parent = await followLink<EntityModelFolder>(folder.value._links?.parent.href || '')
        .catch((e: ApiError) => {
          if (e.status === 404) {
            return null;
          }
          throw e;
        })
      if (parent) {
        router.push({name: 'folderWithId', params: {folderId: parent.id}})
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
      openFolder,
      goToParent,
      newFolder,
      showUploadDialog,
      fileUpload,
      newFile,
      uploadFile,
      openFile
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
