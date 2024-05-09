<script setup lang="ts">
import ProjectList from '@/components/project/project_list.vue'
</script>

<template>
  <section class="q-mt-md">
    <div class="row justify-end">
      <custom-button :to="{ name: 'CreateProject' }" rounded color="primary" class="create-project" label="Create Project" />
    </div>
    <project-list />
  </section>
</template>

<style scoped></style>
