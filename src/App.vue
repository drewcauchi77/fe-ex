<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { QLayout, QPageContainer } from 'quasar'
import { useProjectStore } from './stores/project'
import Navigation from './components/shared/navigation.vue'
import type { Project } from './definitions/interfaces'

const projectStore = useProjectStore()

onMounted(() => {
  const LS_projectList: string | null = localStorage.getItem('projectList')
  const projectList: Project[] | null = LS_projectList ? JSON.parse(LS_projectList) : null
  projectStore.setProjectList(projectList ?? [], 'file -> App.vue; method -> onMounted()')
})
</script>

<template>
  <q-layout class="bg-white" v-if="projectStore.getProjectList">
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
