<template>
  <div class="q-pa-sm grow-container grow q-gutter-sm">
    <VideoPlayer v-if="isReady" :options="videoOptions"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRef} from 'vue';
import {
  EntityModelFile,
  FileEntityControllerService
} from 'src/clients/generated';
import VideoPlayer from 'components/VideoPlayer.vue';

interface Sources {
  src: string,
  type?: string
}

export default defineComponent({
  name: 'media-player',
  components: {VideoPlayer},
  props: {
    fileId: {
      required: true,
      type: String
    },
  },
  setup: function (props) {

    const isReady = ref(false);
    const file = ref<EntityModelFile>({})
    const fileId = toRef(props, 'fileId');
    const videoOptions = ref({
      autoplay: true,
      controls: true,
      sources: [
        {
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }
      ] as Sources[]
    });

    async function refetch() {
      file.value = await FileEntityControllerService.getItemResourceFileGet(fileId.value)
      const contentUrl = file.value._links?.content.href
      if (!contentUrl) {
        throw new Error('content url is null')
      }
      videoOptions.value.sources = [
        {
          src: contentUrl,
          type: file.value.contentMimeType
        }
      ]
      isReady.value = true;
    }

    return {
      file,
      videoOptions,
      refetch,
      isReady
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
})
</script>

<style scoped>

</style>
