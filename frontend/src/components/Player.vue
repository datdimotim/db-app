<template>
  <div class="q-pa-sm grow-container grow q-gutter-sm">
    <q-media-player
      type="video"
      :sources="sources"
    ></q-media-player>
  </div>
</template>

<script lang="ts">
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'

export default {
  name: 'media-player',
  components: { QMediaPlayer },
  data: () => ({
    sources: [
      {
        src: '/files/1/content',
        //type: 'video/mp4'
      }
    ]
  }),
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cacheModel: function () {

    }
  },
  watch: {
    fetchFn: {
      immediate: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handler: function () {

      }
    }
  },

  computed: {
    columns: function () {
      return 1;
    }
  }
}
</script>

<style scoped>

</style>
