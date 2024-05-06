<script setup lang="ts">
import { QBtn } from 'quasar'
import ProjectList from '@/components/project/project_list.vue'
</script>

<template>
  <section class="q-mt-md">
    <div class="row justify-end">
      <q-btn :to="{ name: 'CreateProject' }" icon="add" color="positive" label="Create Project" />
    </div>
    <project-list />
  </section>
</template>

<style scoped></style>
