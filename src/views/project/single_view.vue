<script setup lang="ts">
import { useRoute } from 'vue-router'
import breadcrumb from '@/components/shared/breadcrumb.vue'

const route = useRoute()
</script>

<template>
  <section>
    <breadcrumb />
    <h1>{{ $route.params.id }}</h1>
  </section>
</template>

<style scoped></style>
