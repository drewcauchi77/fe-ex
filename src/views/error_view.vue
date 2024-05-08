<!-- !!! Final !!! -->
<script setup lang="ts">
import PageBreadcrumb from '@/components/shared/page_breadcrumb.vue'

const props = defineProps<{
  message?: string
}>()
</script>

<template>
  <section>
    <img src="/images/404.png" class="q-my-0 q-mx-auto block" />
    <div class="q-pt-lg">
      <span class="text-center q-pb-sm block" v-if="props.message">{{ props.message }}</span>
      <page-breadcrumb class="q-pa-non text-center" />
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  max-width: 1200px;
  height: 50vh;
  object-fit: cover;
}
</style>
