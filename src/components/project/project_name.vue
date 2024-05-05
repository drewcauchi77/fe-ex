<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { QInput, QBtn, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'

const $q = useQuasar()
const projectStore = useProjectStore()
const emit = defineEmits(['goToNextStep'])

const projectName = ref<string>('')

const startProject = (): void => {
  projectStore.createProject(
    projectName.value,
    'file -> components/project/project_name.vue; method -> saveName()'
  )

  $q.notify({
    color: 'positive',
    message: 'Project has been created!',
    position: 'top'
  })

  emit('goToNextStep')
}
</script>

<template>
  <section>
    <div class="row">
      <q-input
        v-model="projectName"
        outlined
        label-slot
        class="col-grow"
        :readonly="projectStore.state.project.name !== null"
      >
        <template v-slot:label>
          <span class="text-weight-medium"
            >Enter Project Name
            <span class="text-red">*</span>
          </span>
        </template>
      </q-input>
      <q-btn
        v-if="projectStore.state.project.name === null"
        class="q-my-sm q-ml-sm"
        color="primary"
        icon="create"
        label="Start Project"
        @click="startProject()"
        :disable="projectName === ''"
      />
    </div>
  </section>
</template>

<style scoped></style>
