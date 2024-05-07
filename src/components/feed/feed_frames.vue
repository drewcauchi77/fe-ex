<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { QMarkupTable, QBtn, QDialog, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'
const FrameEdit = defineAsyncComponent(() => import('@/components/frame/frame_edit.vue'))

const $q = useQuasar()
const router = useRouter()
const projectStore = useProjectStore()

const openDialog = ref<boolean>(false)
const frameIndexToOpen = ref<number | null>(null)

const setFrameDialog = (reset: boolean, frameIndex?: number): void => {
  frameIndexToOpen.value = reset ? null : frameIndex ?? null
  openDialog.value = reset ? false : true
}

const removeFrame = (frameIndex: number): void => {
  const frames = projectStore.getFeedFramesTaken.filter((_, index) => index !== frameIndex)
  projectStore.setFeedFramesTaken(frames, 'file -> components/feed/feed_frames.vue; method -> removeFrame()')

  $q.notify({
    color: 'info',
    message: 'Frame has been successfully removed!',
    position: 'top'
  })
}

const saveProject = (): void => {
  // To check
  projectStore.getCurrentProject?.feedFrames.push(...projectStore.getFeedFramesTaken)

  $q.notify({
    color: 'positive',
    message: 'Project has been saved!',
    position: 'top'
  })

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
          <th class="text-right">Actions</th>
        </tr>
      </thead>

      <tbody class="bg-grey-3">
        <template v-if="projectStore.getFeedFramesTaken.length > 0">
          <tr
            v-for="(frame, index) in projectStore.getFeedFramesTaken"
            :key="index"
            @click="setFrameDialog(false, index)"
            class="cursor-pointer"
          >
            <td class="text-left image-cell">
              <img :src="frame.image" class="frame" />
            </td>
            <td class="text-right">{{ frame.tags.length > 0 ? frame.tags : 'No Tags' }}</td>
            <td class="text-right">{{ frame.createdAt }}</td>
            <td class="text-right">
              <div class="row column items-end">
                <q-btn rounded color="positive" label="Edit Frame" class="q-ma-sm" @click="setFrameDialog(false, index)" />
                <q-btn rounded outline color="negative" class="q-ma-sm" label="Delete Frame" @click.stop="removeFrame(index)" />
              </div>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td colspan="4" class="text-center">No frames captured for this project yet!</td>
        </tr>
      </tbody>
    </q-markup-table>

    <div class="q-pt-md text-white text-center">
      <q-btn color="primary" rounded label="Save Project" class="q-mt-sm" @click="saveProject()" />
    </div>

    <q-dialog v-model="openDialog" @beforeHide="setFrameDialog(true)">
      <frame-edit :frameIndex="frameIndexToOpen" />
    </q-dialog>
  </section>
</template>

<style scoped lang="scss">
.frame {
  width: 250px;
}
</style>
