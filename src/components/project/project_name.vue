<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { QInput } from 'quasar'
import { useProjectStore } from '@/stores/project'
import { fireNotification } from '@/helpers/helpers'
import type { Ref } from 'vue'
import type { Router } from 'vue-router'

const projectStore = useProjectStore()
const router: Router = useRouter()

const projectName: Ref<string> = ref('')
// We have split the create project page into 2 steps - first project name and then the capture feed, so we need to emit the event to the parent
const emit = defineEmits<{
  (event: 'goToNextStep'): void
}>()

const shouldDisableButtons = computed((): boolean => projectStore.getCurrentProjectName !== null || projectName.value === '')

const handleProjectCreation = (): void => {
  if (projectStore.projectList) {
    // We need a random ID, having a consecutive ID for the projects is not as good - we then save it in the projects list and set the current ID
    const projectId: string = crypto.randomUUID()

    projectStore.setProjectList(
      [
        {
          id: projectId,
          name: projectName.value,
          createdAt: new Date().toLocaleString(),
          feedFrames: []
        },
        ...projectStore.projectList
      ],
      'file -> components/project/project_name.vue; method -> handleProjectCreation()'
    )

    // By setting the current project id, we can easily locate which project we are working on for future editing
    projectStore.setCurrentProjectID(projectId, 'file -> components/project/project_name.vue; method -> handleProjectCreation()')
  }

  fireNotification('Project has been created successfully!', 'positive')
  emit('goToNextStep')
}
</script>

<template>
  <section class="shadow-2 bg-dark q-pa-lg rounded-borders">
    <h1 class="text-h6 text-black q-mx-none q-mt-none q-mb-lg">Create Project</h1>

    <form class="input-fields" @submit.prevent="handleProjectCreation()">
      <q-input
        v-model="projectName"
        outlined
        label-slot
        class="col-grow bg-white rounded-borders text-sm q-mb-lg"
        name="projectName"
        :readonly="projectStore.getCurrentProjectName !== null"
      >
        <template v-slot:label>
          <span class="text-weight-medium"
            >Enter Project Name
            <span class="text-red">*</span>
          </span>
        </template>
      </q-input>

      <div class="row justify-end">
        <custom-button
          class="q-ml-md q-mb-sm"
          rounded
          outline
          color="negative"
          label="Cancel"
          @click="router.push({ name: 'Projects' })"
          :disable="shouldDisableButtons"
        />
        <custom-button
          class="create-project q-ml-md q-mb-sm"
          rounded
          color="primary"
          label="Create"
          type="submit"
          @click="handleProjectCreation()"
          :disable="shouldDisableButtons"
        />
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss"></style>
