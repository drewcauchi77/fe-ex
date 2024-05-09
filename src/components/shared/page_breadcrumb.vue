<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

const router: Router = useRouter()

// Gets us the route the user visited last, if it doesn't exist - we go to the Dashboard, we also need to get the meta title by resolving the back route
const backRoute: string = (router.options.history.state.back as string) ?? '/'
const getBackRouteTitle: RouteLocationNormalizedLoaded | undefined = router.resolve(backRoute)
</script>

<template>
  <section class="breadcrumb q-py-lg q-pl-lg rounded-borders">
    <router-link :to="{ path: `${backRoute}` }" class="text-black">
      Go Back{{ getBackRouteTitle?.meta?.title ? ` to ${getBackRouteTitle.meta.title}` : '' }}
    </router-link>
  </section>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  transition: 0.3s all;
  &:hover {
    text-decoration: underline;
  }
}
</style>
