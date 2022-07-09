<template>
  <div>
    <p>File list</p>
    <ul>
      <li v-for="file in fileList" :key="file.id">
        {{ file.id }} - {{ file.name }}
      </li>
    </ul>
    <p>Count: {{ fileList.length }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
} from 'vue';
import { Todo } from './models';
import {EntityModelFile, FileEntityControllerService} from 'src/clients';


export default defineComponent({
  name: 'FolderView',
  props: {
    todos: {
      required: false,
      type: Array as PropType<Todo[]>,
      default: () => []
    },
  },
  setup() {
    return {
      fileList: ref([] as EntityModelFile[])
    };
  },
  async mounted() {
    const response = await FileEntityControllerService.getCollectionResourceFileGet1()
    this.fileList = response._embedded?.files || []
  }
});
</script>
