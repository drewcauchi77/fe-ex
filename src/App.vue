<!-- !!! Final !!! -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { QLayout, QPageContainer, useQuasar } from 'quasar'
import { useProjectStore } from './stores/project'
import Navigation from './components/shared/navigation.vue'
import type { Project } from './definitions/interfaces'

const $q = useQuasar()
const projectStore = useProjectStore()

onMounted(() => {
  try {
    const LS_projectListJSON: string | null = localStorage.getItem('projectList')
    const LS_projectList: Project[] = LS_projectListJSON ? JSON.parse(LS_projectListJSON) : []
    // Set project list in the store which will also set in local storage to simulate an API call
    projectStore.setProjectList(LS_projectList, 'file -> App.vue; method -> onMounted()')
  } catch (error) {
    console.error('There was an error retrieving and parsing the project list!', error)
    $q.notify({
      color: 'negative',
      message: 'There was an error retrieving and parsing the project list!',
      position: 'top'
    })
  }
})
</script>

<template>
  <q-layout class="bg-white" v-if="projectStore.projectList">
    <q-page-container class="container q-my-none q-mx-auto">
      <main class="q-pa-md">
        <navigation />
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
