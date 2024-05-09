<script setup lang="ts">
import { QBtn, QCard, QSeparator, QCardSection, QCardActions } from 'quasar'
import { useProjectStore } from '@/stores/project'
import FrameTags from './frame_tags.vue'

const projectStore = useProjectStore()

const props = defineProps<{
  frameIndex: number | null
}>()
</script>

<template>
  <q-card v-if="props.frameIndex !== null">
    <q-card-section>
      <div class="text-h6">Edit Frame</div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-pt-none">
      <img :src="projectStore.feedFrames[props.frameIndex].image" class="q-mb-lg full-width" />
      <p class="q-mb-lg">
        Created at <strong>{{ projectStore.feedFrames[props.frameIndex].createdAt }}</strong>
      </p>
      <frame-tags :frameIndex="frameIndex" />
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn class="q-ml-md q-mb-sm" rounded outline color="negative" label="Dismiss" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss"></style>
