<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import type { Router } from 'vue-router'

const router: Router = useRouter()
</script>

<template>
  <section class="breadcrumb q-py-lg q-pl-lg rounded-borders">
    <router-link :to="router.options.history.state.back ? { path: `${router.options.history.state.back}` } : { path: '/' }">
      Go Back
    </router-link>
  </section>
</template>

<style scoped lang="scss">
.breadcrumb {
  height: fit-content;
}
</style>
