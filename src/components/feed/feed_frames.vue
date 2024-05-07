<!-- !!! Final !!! -->
<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { QMarkupTable, QBtn, QDialog, QBadge, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'
import type { Ref } from 'vue'
import type { FeedFrame, Project } from '@/definitions/interfaces'

const FrameEdit = defineAsyncComponent(() => import('@/components/frame/frame_edit.vue'))

const $q = useQuasar()
const router = useRouter()
const projectStore = useProjectStore()

const openDialog: Ref<boolean> = ref(false)
const frameIndexToOpen: Ref<number | null> = ref(null)

const props = defineProps<{
  frames: FeedFrame[]
  canFramesBeEdited?: boolean
}>()

const setFrameDialog = (reset: boolean, frameIndex?: number): void => {
  if (props.canFramesBeEdited) {
    frameIndexToOpen.value = reset ? null : frameIndex ?? null
    openDialog.value = reset ? false : true
  }
}

const removeFrame = (frameIndex: number): void => {
  const frames = projectStore.feedFrames.filter((_, index) => index !== frameIndex)
  projectStore.setFeedFramesTaken(frames, 'file -> components/feed/feed_frames.vue; method -> removeFrame()')

  $q.notify({
    color: 'info',
    message: 'Frame has been removed successfully!',
    position: 'top'
  })
}

const saveProject = (): void => {
  if (projectStore.projectList && projectStore.currentProjectId) {
    const projectToUpdate: Project | undefined = projectStore.projectList.find((project) => project.id === projectStore.currentProjectId)
    if (projectToUpdate) {
      projectToUpdate.feedFrames = projectStore.feedFrames
      projectStore.setProjectList([...projectStore.projectList], 'file -> components/feed/feed_frames.vue; method -> saveProject()')
    }

    $q.notify({
      color: 'positive',
      message: 'Project has been saved successfully!',
      position: 'top'
    })
  } else {
    $q.notify({
      color: 'negative',
      message: 'Project could not be found - request aborted!',
      position: 'top'
    })
  }

  router.push({ name: 'Projects' })
  projectStore.setFeedFramesTaken([], 'file -> components/feed/feed_frames.vue; method -> saveProject()')
  projectStore.setCurrentProjectID(null, 'file -> components/feed/feed_frames.vue; method -> saveProject()')
}
</script>

<template>
  <section class="shadow-2 bg-dark q-mt-lg q-pa-lg rounded-borders">
    <h1 class="text-h6 text-black q-mx-none q-mt-none q-mb-lg">Captured Frames</h1>

    <q-markup-table flat bordered>
      <thead class="bg-grey-4">
        <tr>
          <th class="text-left">Frame</th>
          <th class="text-right">Tags</th>
          <th class="text-right">Created</th>
          <th class="text-right" v-if="canFramesBeEdited">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-grey-3">
        <template v-if="props.frames.length > 0">
          <tr
            v-for="(frame, index) in props.frames"
            :key="index"
            @click="setFrameDialog(false, index)"
            :class="{ 'cursor-pointer': canFramesBeEdited }"
          >
            <td class="text-left image-cell">
              <img :src="frame.image" class="frame" />
            </td>
            <td class="text-right">
              <template v-if="frame.tags.length > 0">
                <q-badge rounded color="primary" v-for="(tag, index) in frame.tags" :key="index" class="badge q-mr-sm">
                  <span>{{ tag }}</span>
                </q-badge>
              </template>
              <span v-else>No Tags</span>
            </td>
            <td class="text-right">{{ frame.createdAt }}</td>
            <td class="text-right" v-if="canFramesBeEdited">
              <div class="row column items-end">
                <q-btn rounded color="positive" label="Edit Frame" class="q-ma-sm" @click="setFrameDialog(false, index)" />
                <q-btn rounded outline color="negative" class="q-ma-sm" label="Delete Frame" @click.stop="removeFrame(index)" />
              </div>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td :colspan="canFramesBeEdited ? '4' : '3'" class="text-center">No frames captured for this project!</td>
        </tr>
      </tbody>
    </q-markup-table>

    <div class="q-pt-md text-white text-center" v-if="canFramesBeEdited">
      <q-btn color="primary" rounded label="Save Project" class="q-mt-sm" @click="saveProject()" />
    </div>

    <q-dialog v-model="openDialog" @beforeHide="setFrameDialog(true)" v-if="canFramesBeEdited">
      <frame-edit :frameIndex="frameIndexToOpen" />
    </q-dialog>
  </section>
</template>

<style scoped lang="scss">
.frame {
  width: 250px;
}
</style>
