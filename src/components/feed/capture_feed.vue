<!-- !!! Final !!! -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { QBtn, QSpinnerIos, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'
import type { Ref } from 'vue'

import FeedFrames from './feed_frames.vue'

const $q = useQuasar()
const projectStore = useProjectStore()

const feed: Ref<HTMLVideoElement | null> = ref(null)
const feedStatus: Ref<'stopped' | 'loading' | 'started'> = ref('stopped')
const showCapturedFrames: Ref<boolean> = ref(false)

const hasFeedStarted = computed((): boolean => feedStatus.value === 'started')

const startFeed = async (): Promise<void> => {
  try {
    feedStatus.value = 'loading'
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })

    if (feed.value) feed.value.srcObject = videoStream
    feedStatus.value = 'started'
  } catch (error) {
    console.error('There has been an error connecting or starting the feed!', error)
    $q.notify({
      color: 'negative',
      message: 'There has been an error connecting or starting the feed!',
      position: 'top'
    })
  }
}

const captureFeedFrame = (): void => {
  if (feed.value && feed.value.srcObject) {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = feed.value?.videoWidth ?? 640
    canvas.height = feed.value?.videoHeight ?? 480
    canvas.getContext('2d')?.drawImage(feed.value, 0, 0)

    const imageUrl: string = canvas.toDataURL()
    projectStore.setFeedFramesTaken(
      [
        ...projectStore.feedFrames,
        {
          image: imageUrl,
          createdAt: new Date().toLocaleString(),
          tags: []
        }
      ],
      'file -> components/feed/capture_feed.vue, method -> captureFeedFrame()'
    )

    $q.notify({
      color: 'positive',
      message: 'Frame has been captured from feed!',
      position: 'top'
    })
  }
}

const stopFeed = (): void => {
  if (feed.value && feed.value.srcObject) {
    feed.value.srcObject = null
    feedStatus.value = 'stopped'
    showCapturedFrames.value = true

    setTimeout(function () {
      document.querySelector('#feed-frames')?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }
}
</script>

<template>
  <section class="shadow-2 bg-dark q-mt-lg q-pa-lg rounded-borders">
    <h1 class="text-h6 text-black q-mx-none q-mt-none q-mb-lg">Connect Feed</h1>
    <div class="bg-black relative-position rounded-borders">
      <video ref="feed" autoplay class="video-container q-mt-none q-mx-auto block"></video>
      <q-btn
        round
        color="primary"
        icon="play_arrow"
        class="play-button absolute-center"
        @click="startFeed()"
        v-if="feedStatus === 'stopped'"
        :disable="!projectStore.getCurrentProjectName"
      />
      <q-spinner-ios v-else-if="feedStatus === 'loading'" color="primary" class="loading absolute-center" />
    </div>
    <div class="row q-pt-md justify-end">
      <q-btn class="q-ml-md q-mb-sm" rounded color="positive" label="Stop Feed & Review" @click="stopFeed()" :disable="!hasFeedStarted" />
      <q-btn class="q-ml-md q-mb-sm" rounded color="primary" label="Capture Frame" @click="captureFeedFrame()" :disable="!hasFeedStarted" />
    </div>
  </section>
  <feed-frames v-if="showCapturedFrames" id="feed-frames" :frames="projectStore.feedFrames" :canFramesBeEdited="true" />
</template>

<style scoped lang="scss">
.video-container {
  max-height: 700px;
  width: 100%;
  aspect-ratio: 1;
}

.play-button,
.loading {
  height: 50px;
  width: 50px;
}
</style>