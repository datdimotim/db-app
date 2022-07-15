<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Select files</div>
    </q-card-section>

    <q-card-section>
      <q-file multiple v-model="fileUploads" label="Select files"></q-file>
      <label>Progress: {{ processed }} of {{ fileUploads.length }}</label>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Cancel" v-close-popup></q-btn>
      <q-btn label="Ok" @click="uploadFiles" :disable="!fileUploads"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, Ref, ref, toRef} from 'vue';
import {
  EntityModelFolder,
  FileEntityControllerService,
} from 'src/clients/generated';
import uploadFileContent from 'src/clients/file-uploader';

export default defineComponent({
  name: 'FileUploader',
  props: {
    folder: {
      required: false,
      default: null
    }
  },
  setup(props, context) {
    const fileUploads = ref<File[]>([]);
    const folder = toRef(props, 'folder') as Ref<EntityModelFolder | null>;
    const processed = ref(0);

    async function uploadFiles() {
      processed.value = 0;
      try {
        const files = fileUploads.value;

        for (const file of files) {
          const response = await FileEntityControllerService.postCollectionResourceFilePost({
            name: file.name,
            contentMimeType: file.type,
            parent: folder.value?._links?.self.href
          })

          const contentLink = response._links?.content.href;
          if (!contentLink) {
            throw new Error('content link is null')
          }

          await uploadFileContent(contentLink, file);

          processed.value++;
          context.emit('progress', {
            processed: processed.value,
            total: files.length
          })
        }
        context.emit('completed')
      } catch (error) {
        context.emit('error', {
          error,
          remainFiles: fileUploads.value.slice(processed.value)
        });
      } finally {
        fileUploads.value = [];
      }
    }

    return {
      fileUploads,
      uploadFiles,
      processed
    };
  }
});
</script>
