<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import Breadcrumb from '@/components/shared/breadcrumb.vue'
import ProjectName from '@/components/project/project_name.vue'
const Feed = defineAsyncComponent(() => import('@/components/feed/feed.vue'))

const projectStore = useProjectStore()

const currentStep = ref<number>(1)

onBeforeRouteLeave((to, from, next) => {
  if (projectStore.state.project.name) {
    const answer = window.confirm(
      `Are you sure you want to leave? ${projectStore.state.project.feedFrames.length > 0 ? 'Your captured feed frames will not be saved!' : 'You have not yet captured any feed frames!'}`
    )

    if (!answer) {
      next(false)
    } else {
      projectStore.setCreatedProjectFrames([], 'file -> views/project/create_view.vue; method -> onBeforeRouteLeave()')
      if (projectStore.state.projectList) {
        projectStore.setProjectList(
          [projectStore.state.project, ...projectStore.state.projectList],
          'file -> views/project/create_view.vue; method -> onBeforeRouteLeave()'
        )
      }
      projectStore.resetCreatedProject('file -> views/project/create_view.vue; method -> onBeforeRouteLeave()')
      next()
    }
  } else {
    next()
  }
})
</script>

<template>
  <section>
    <breadcrumb />
    <project-name v-if="currentStep >= 1" @goToNextStep="currentStep += 1" />
    <feed v-if="currentStep >= 2" />
  </section>
</template>

<style scoped lang="scss"></style>
