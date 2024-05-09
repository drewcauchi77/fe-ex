<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { QMarkupTable, QDialog, QBadge } from 'quasar'
import { useProjectStore } from '../../stores/project'
import { fireNotification } from '../../helpers/helpers'
import type { Ref } from 'vue'
import type { FeedFrame, Project } from '../../definitions/interfaces'

const FrameEdit = defineAsyncComponent(() => import('../frame/frame_edit.vue'))

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
    // This component is used both in project creation and previous project pages
    // This is the handler to open the quasar dialog box - operating with a v-model
    frameIndexToOpen.value = reset ? null : frameIndex ?? null
    openDialog.value = reset ? false : true
  }
}

const removeFrame = (frameIndex: number): void => {
  // We remove the frame and set it in the store
  const frames = JSON.parse(JSON.stringify(projectStore.feedFrames.filter((_, index) => index !== frameIndex)))
  projectStore.setFeedFramesTaken(JSON.parse(JSON.stringify(frames)), 'file -> components/feed/feed_frames.vue; method -> removeFrame()')
  fireNotification('Frame has been removed successfully!', 'info')
}

const saveProject = (): void => {
  // A project is created on name insertion - user should press the Save Project button to ensure that the captured frames are saved for future use
  if (projectStore.projectList && projectStore.currentProjectId) {
    const projects: Project[] = JSON.parse(JSON.stringify(projectStore.projectList))
    const projectToUpdate: Project | undefined = projects.find((project) => project.id === projectStore.currentProjectId)
    if (projectToUpdate) {
      projectToUpdate.feedFrames = projectStore.feedFrames
      projectStore.setProjectList(JSON.parse(JSON.stringify(projects)), 'file -> components/feed/feed_frames.vue; method -> saveProject()')
      fireNotification('Project has been saved successfully!', 'positive')
    } else {
      fireNotification('There was an issue saving your project!', 'negative')
    }
  } else {
    fireNotification('Project could not be found - request aborted!', 'negative')
  }

  // Routing back to projects page and resetting the store values
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
            class="frame-row"
          >
            <td class="text-left image-cell">
              <img :src="frame.image" class="frame" />
            </td>
            <td class="text-right frame-tags">
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
                <custom-button
                  rounded
                  color="positive"
                  label="Edit Frame"
                  class="edit-frame q-ma-sm"
                  @click="setFrameDialog(false, index)"
                />
                <custom-button
                  rounded
                  outline
                  color="negative"
                  class="delete-frame q-ma-sm"
                  label="Delete Frame"
                  @click.stop="removeFrame(index)"
                />
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
      <custom-button color="primary" rounded label="Save Project" class="save-project q-mt-sm" @click="saveProject()" />
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
