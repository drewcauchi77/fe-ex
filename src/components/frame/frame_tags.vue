<script setup lang="ts">
import { ref } from 'vue'
import { useProjectStore } from '@/stores/project'
import { QInput, QBadge, QBtn } from 'quasar'

const projectStore = useProjectStore()

const tag = ref('')
const tagList = ref<string[]>([])
const props = defineProps<{
  frameIndex: number | null
}>()

function saveTag() {
  // To check
  if (!!tag.value?.trim()) {
    tagList.value.push(tag.value)
    tag.value = ''
  }
}
</script>

<template>
  <section class="q-mt-lg">
    <q-input outlined v-model="tag" @keydown.enter="saveTag()" label="Add tags" />
    <div class="q-mt-md">
      <q-badge rounded outline color="primary" v-for="tag in tagList" :key="tag" class="badge q-mr-sm q-mb-sm q-pl-sm q-py-none q-pr-none">
        <span>{{ tag }}</span>
        <q-btn class="remove-tag q-my-none q-mr-none q-ml-sm q-pa-none" rounded color="primary" icon="close" />
      </q-badge>
    </div>
  </section>
</template>

<style scoped lang="scss">
.badge {
  height: 20px;
  .remove-tag {
    width: 22px;
    height: 22px;
    font-size: 8px;
    margin-right: -1px;
  }
}
</style>
