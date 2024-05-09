<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { RouterView } from 'vue-router'
import { QLayout, QPageContainer, useQuasar } from 'quasar'
import { useProjectStore } from './stores/project'
import SiteNavigation from './components/shared/site_navigation.vue'
import type { Project } from './definitions/interfaces'

const $q = useQuasar()
const projectStore = useProjectStore()
const $useLocalStorage = inject('$useLocalStorage')

// Since we are using the projects list, first we are doing a call to get the projects and save it in the store
onMounted(() => {
  // We do not have an API or DB call built, so by default we are using the local storage to persist projects across multiple browser tab openings
  // From main.ts we can turn the local storage off which will be applied to the store as well
  if ($useLocalStorage) {
    try {
      const LS_projectListJSON: string | null = localStorage.getItem('projectList')
      const LS_projectList: Project[] = LS_projectListJSON ? JSON.parse(LS_projectListJSON) : []
      projectStore.setProjectList(LS_projectList, 'file -> App.vue; method -> onMounted()')
    } catch (error) {
      console.error('There was an error retrieving and parsing the project list!', error)
      $q.notify({
        color: 'negative',
        message: 'There was an error retrieving and parsing the project list!',
        position: 'top'
      })
    }
  } else {
    localStorage.removeItem('projectList')
    projectStore.setProjectList([], 'file -> App.vue; method -> onMounted()')
  }
})
</script>

<template>
  <q-layout class="bg-white" v-if="projectStore.projectList">
    <q-page-container class="container q-my-none q-mx-auto">
      <main class="q-pa-md">
        <site-navigation />
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.container {
  max-width: 1400px;
}
</style>
