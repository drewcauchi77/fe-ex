<script setup lang="ts">
import { QMarkupTable, QBtn, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'

const $q = useQuasar()
const projectStore = useProjectStore()

const deleteProject = (projectIndex: number): void => {
  console.log(projectIndex)
  if (projectStore.state.projectList) {
    const projects = projectStore.state.projectList.filter((_, index) => index !== projectIndex)
    projectStore.setProjectList(
      projects,
      'file -> components/project/project_list.vue; method -> deleteProject()'
    )

    $q.notify({
      color: 'positive',
      message: 'Project has been successfully deleted!',
      position: 'top'
    })
  }
}
</script>

<template>
  <section>
    <q-markup-table flat bordered class="q-mt-md">
      <thead class="bg-grey-4">
        <tr>
          <th class="text-left">Project Name</th>
          <th class="text-right">Number of Captures</th>
          <th class="text-right">Date Created</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-grey-3">
        <template
          v-if="projectStore.state.projectList && projectStore.state.projectList.length > 0"
        >
          <tr v-for="(project, index) in projectStore.state.projectList" :key="index">
            <td class="text-left">{{ project.name }}</td>
            <td class="text-right">{{ project.feedFrames.length }}</td>
            <td class="text-right">{{ project.createdAt }}</td>
            <td class="text-right">
              <q-btn round color="primary" icon="edit" class="q-ma-sm" />
              <q-btn
                round
                color="negative"
                icon="delete"
                class="q-ma-sm"
                @click="deleteProject(index)"
              />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4" class="text-center">No projects created yet!</td>
        </tr>
      </tbody>
    </q-markup-table>
  </section>
</template>

<style scoped></style>
