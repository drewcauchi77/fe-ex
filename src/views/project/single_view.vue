<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../../stores/project'
import PageBreadcrumb from '../../components/shared/page_breadcrumb.vue'

const FeedFrames = defineAsyncComponent(() => import('../../components/feed/feed_frames.vue'))
const ErrorView = defineAsyncComponent(() => import('../error_view.vue'))

const route = useRoute()
const projectStore = useProjectStore()
// Through the ID in the route, we need to look in our projects list to ensure that we get the proper project details
const projectById = projectStore.getProjectById(route.params.id as string)
</script>

<template>
  <section>
    <template v-if="projectById">
      <page-breadcrumb />
      <div class="q-pt-lg q-px-lg">
        <h1 class="text-h6 text-black q-mx-none q-mt-none q-mb-lg">Project: {{ projectById.name }}</h1>
        <p class="q-mb-lg">
          Created at <strong>{{ projectById.createdAt }}</strong>
        </p>
      </div>
      <feed-frames :frames="projectById.feedFrames" />
    </template>
    <error-view v-else :message="`No project found with ID: ${$route.params.id}`" />
  </section>
</template>

<style scoped></style>
