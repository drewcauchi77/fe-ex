<script setup lang="ts">
import { useRouter } from 'vue-router'
import { QMarkupTable } from 'quasar'
import { useProjectStore } from '@/stores/project'
import { fireNotification } from '@/helpers/helpers'

const router = useRouter()
const projectStore = useProjectStore()

// Since this router push is used in 2 places, a function was created
const goToProjectPage = (id: string): void => {
  router.push({ path: `/projects/${id}` })
}

const deleteProject = (projectIndex: string): void => {
  if (projectStore.projectList) {
    // Removal of project by the project ID
    const projects = projectStore.projectList.filter((project) => projectIndex !== project.id)
    projectStore.setProjectList([...projects], 'file -> components/project/project_list.vue; method -> deleteProject()')
    fireNotification('Project has been successfully deleted!', 'positive')
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
        <template v-if="projectStore.projectList && projectStore.projectList.length > 0">
          <tr
            v-for="(project, index) in projectStore.projectList"
            :key="index"
            @click="goToProjectPage(project.id)"
            class="cursor-pointer project-row"
          >
            <td class="text-left">{{ project.name }}</td>
            <td class="text-right">{{ project.feedFrames.length }}</td>
            <td class="text-right">{{ project.createdAt }}</td>
            <td class="text-right">
              <div class="row column items-end">
                <custom-button
                  rounded
                  color="positive"
                  label="Open Project"
                  class="open-project q-ma-sm"
                  @click="goToProjectPage(project.id)"
                />
                <custom-button
                  rounded
                  outline
                  color="negative"
                  class="delete-project q-ma-sm"
                  label="Delete Project"
                  @click.stop="deleteProject(project.id)"
                />
              </div>
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
