<script setup lang="ts">
import { QBtn, QCard, QSeparator, QCardSection, QCardActions } from 'quasar'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

const props = defineProps<{
  frameIndex: number | null
}>()

console.log(props.frameIndex)
</script>

<template>
  <q-card v-if="props.frameIndex !== null">
    <q-card-section>
      <div class="text-h6">Edit Frame</div>
    </q-card-section>

    <q-separator />

    <q-card-section style="max-height: 50vh" class="scroll">
      <img :src="projectStore.state.project.feedFrames[props.frameIndex].image" class="q-mb-lg" />
      <p class="q-mb-lg">
        Created at <strong>{{ projectStore.state.project.feedFrames[props.frameIndex].createdAt }}</strong>
      </p>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn class="q-ml-md q-mb-sm" rounded outline color="negative" label="Decline" v-close-popup />
      <q-btn class="q-ml-md q-mb-sm" rounded color="primary" label="Save" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
