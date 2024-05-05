<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { QBtn, QSpinnerIos, useQuasar } from 'quasar'
import { useProjectStore } from '@/stores/project'

const $q = useQuasar()
const projectStore = useProjectStore()
const emit = defineEmits(['goToNextStep'])

const feed = ref<HTMLVideoElement | null>(null)
const feedStatus = ref<string>('stopped')

const startFeed = async (): Promise<void> => {
  try {
    feedStatus.value = 'loading'
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (feed.value) feed.value.srcObject = videoStream
    feedStatus.value = 'started'
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'There has been an error starting your feed!',
      position: 'top'
    })
    console.error('!!! Error Starting Feed !!!', error)
  }
}

const captureFeedFrame = (): void => {
  if (feed.value && feed.value.srcObject) {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = feed.value?.videoWidth ?? 640
    canvas.height = feed.value?.videoHeight ?? 480
    canvas.getContext('2d')?.drawImage(feed.value, 0, 0)

    const imageUrl: string = canvas.toDataURL()
    projectStore.setCreatedProjectFrames(
      [
        ...projectStore.state.project.feedFrames,
        {
          image: imageUrl,
          createdAt: new Date().toLocaleString()
        }
      ],
      'file -> components/feed/feed.vue, method -> captureFeedFrame()'
    )

    $q.notify({
      color: 'positive',
      message: 'Frame captured from feed!',
      position: 'top'
    })
  }
}

const stopFeed = (): void => {
  if (feed.value && feed.value.srcObject) {
    feed.value.srcObject = null
    feedStatus.value = 'stopped'
    emit('goToNextStep')
  }
}
</script>

<template>
  <section class="q-mt-md">
    <div class="bg-black relative-position">
      <video ref="feed" autoplay class="video-container q-mt-none q-mx-auto"></video>
      <q-btn
        round
        color="primary"
        icon="play_arrow"
        class="play-button absolute-center"
        @click="startFeed()"
        v-if="feedStatus === 'stopped'"
        :disable="!projectStore.state.project.name"
      />
      <q-spinner-ios
        v-else-if="feedStatus === 'loading'"
        color="primary"
        class="loading absolute-center"
      />
    </div>
    <div class="settings q-py-md text-white text-center">
      <q-btn
        class="q-ma-sm"
        color="secondary"
        icon="camera_alt"
        label="Capture Frame"
        @click="captureFeedFrame()"
        :disable="feedStatus !== 'started'"
      />
      <q-btn
        class="q-ma-sm"
        color="negative"
        icon="stop"
        label="Stop Feed & Review"
        @click="stopFeed()"
        :disable="feedStatus !== 'started'"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.video-container {
  max-height: 700px;
  display: block;
  width: 100%;
  aspect-ratio: 1;
}

.play-button,
.loading {
  height: 50px;
  width: 50px;
}
</style>
