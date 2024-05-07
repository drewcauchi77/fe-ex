<!-- !!! Final !!! -->
<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import type { Ref } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteLocationNormalized } from 'vue-router'

import Breadcrumb from '@/components/shared/breadcrumb.vue'
import ProjectName from '@/components/project/project_name.vue'
const Feed = defineAsyncComponent(() => import('@/components/feed/feed.vue'))

const projectStore = useProjectStore()

const currentStep: Ref<number> = ref(1)

onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: Function) => {
  if (projectStore.getCurrentProjectName) {
    const answer = window.confirm(
      `Are you sure you want to leave? ${
        projectStore.feedFrames.length > 0 ? 'Your captured feed frames will not be saved!' : 'You have not yet captured any feed frames!'
      }`
    )

    if (!answer) {
      next(false)
    } else {
      projectStore.setFeedFramesTaken([], 'file -> views/project/create_view.vue; method -> onBeforeRouteLeave()')
      projectStore.setCurrentProjectID(null, 'file -> views/project/create_view.vue; method -> onBeforeRouteLeave()')
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
