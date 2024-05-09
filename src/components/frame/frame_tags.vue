<script setup lang="ts">
import { ref } from 'vue'
import { QInput, QBadge } from 'quasar'
import { useProjectStore } from '../../stores/project'
import type { Ref } from 'vue'

const projectStore = useProjectStore()

const tag: Ref<string> = ref('')
// Frames for the current project are saved in the store and we need to know which index to push the tags there - passed as props
const props = defineProps<{
  frameIndex: number | null
}>()

const saveTag = (): void => {
  if (!!tag.value?.trim() && props.frameIndex !== null) {
    // Saving of the tag in the store by the frameIndex
    const frames = JSON.parse(JSON.stringify(projectStore.feedFrames))
    frames[props.frameIndex].tags.push(tag.value)
    projectStore.setFeedFramesTaken(JSON.parse(JSON.stringify(frames)), 'file -> components/frame/frame_tags.vue; method -> saveTag()')
    tag.value = ''
  }
}

const removeTag = (tagIndex: number): void => {
  if (props.frameIndex !== null) {
    // Removing the index of the tag and setting in store
    const frames = JSON.parse(JSON.stringify(projectStore.feedFrames))
    frames[props.frameIndex].tags = [
      ...frames[props.frameIndex].tags.slice(0, tagIndex),
      ...frames[props.frameIndex].tags.slice(tagIndex + 1)
    ]
    projectStore.setFeedFramesTaken(JSON.parse(JSON.stringify(frames)), 'file -> components/frame/frame_tags.vue; method -> removeTag()')
  }
}
</script>

<template>
  <section class="q-mt-lg">
    <q-input outlined v-model="tag" @keydown.enter="saveTag()" label="Add tags" name="frameTags" />
    <div class="q-mt-md" v-if="props.frameIndex !== null">
      <q-badge
        rounded
        outline
        color="primary"
        v-for="(tag, index) in projectStore.feedFrames[props.frameIndex].tags"
        :key="index"
        class="badge q-mr-sm q-mb-sm q-pl-sm q-py-none q-pr-none"
      >
        <span>{{ tag }}</span>
        <custom-button
          class="remove-tag q-my-none q-mr-none q-ml-sm q-pa-none"
          rounded
          color="primary"
          icon="close"
          @click="removeTag(index)"
        />
      </q-badge>
    </div>
  </section>
</template>

<style scoped lang="scss">
.badge {
  height: 20px;
  .remove-tag {
    width: 22px;
    height: 22px;
    font-size: 8px;
    margin-right: -1px;
  }
}
</style>
