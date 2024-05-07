<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { useRouter } from 'vue-router'
import { QInput, QBtn, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'

const $q = useQuasar()
const projectStore = useProjectStore()
const router = useRouter()

const emit = defineEmits(['goToNextStep'])
const projectName = ref<string>('')

const shouldDisableButtons = computed(() => projectStore.getCurrentProjectName !== null || projectName.value === '')

const startProject = (): void => {
  if (projectStore.getProjectList) {
    const projectId: string = crypto.randomUUID()

    projectStore.setProjectList(
      [
        {
          id: projectId,
          name: projectName.value,
          createdAt: new Date().toLocaleString(),
          feedFrames: []
        },
        ...projectStore.getProjectList
      ],
      'file -> components/project/project_name.vue; method -> startProject()'
    )

    projectStore.setCurrentProjectID(projectId, 'file -> components/project/project_name.vue; method -> startProject()')
  }

  $q.notify({
    color: 'positive',
    message: 'Project has been created!',
    position: 'top'
  })

  emit('goToNextStep')
}
</script>

<template>
  <section class="shadow-2 bg-dark q-pa-lg rounded-borders">
    <h1 class="text-h6 text-black q-mx-none q-mt-none q-mb-lg">Create Project</h1>

    <div class="input-fields">
      <q-input
        v-model="projectName"
        outlined
        label-slot
        class="col-grow bg-white rounded-borders text-sm q-mb-lg"
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
        <q-btn
          class="q-ml-md q-mb-sm"
          rounded
          outline
          color="negative"
          label="Cancel"
          @click="router.push({ name: 'Projects' })"
          :disable="shouldDisableButtons"
        />
        <q-btn class="q-ml-md q-mb-sm" rounded color="primary" label="Create" @click="startProject()" :disable="shouldDisableButtons" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
