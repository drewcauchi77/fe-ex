<script setup lang="ts">
import { useRouter } from 'vue-router'
import { QMarkupTable, QBtn, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'

const $q = useQuasar()
const router = useRouter()
const projectStore = useProjectStore()

const removeFrame = (frameIndex: number): void => {
  const frames = projectStore.state.project.feedFrames.filter((_, index) => index !== frameIndex)
  projectStore.setCreatedProjectFrames(
    frames,
    'file -> components/feed/feed_frames.vue; method -> removeFrame()'
  )

  $q.notify({
    color: 'positive',
    message: 'Frame has been successfully removed!',
    position: 'top'
  })
}

const saveProject = (): void => {
  if (projectStore.state.projectList) {
    projectStore.setProjectList(
      [projectStore.state.project, ...projectStore.state.projectList],
      'file -> components/feed/feed_frames.vue; method -> saveProject()'
    )
  }

  $q.notify({
    color: 'positive',
    message: 'Project has been saved!',
    position: 'top'
  })

  router.push({ path: '/projects' })
  projectStore.resetCreatedProject(
    'file -> components/feed/feed_frames.vue; method -> saveProject()'
  )
}
</script>

<template>
  <section class="q-mt-md">
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
        <template v-if="projectStore.state.project.feedFrames.length > 0">
          <tr v-for="(frame, index) in projectStore.state.project.feedFrames" :key="index">
            <td class="text-left">
              <img :src="frame.image" class="frame" />
            </td>
            <td class="text-right">{{ frame.createdAt }}</td>
            <td class="text-right">{{ frame.createdAt }}</td>
            <td class="text-right">
              <q-btn round color="primary" icon="edit" class="q-ma-sm" />
              <q-btn
                round
                color="negative"
                icon="delete"
                class="q-ma-sm"
                @click="removeFrame(index)"
              />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4" class="text-center">No frames captured for this project yet!</td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="q-py-md text-white text-center">
      <q-btn
        color="positive"
        icon="save"
        label="Save Project"
        class="q-ma-sm"
        @click="saveProject()"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.frame {
  max-height: 150px;
}
</style>
