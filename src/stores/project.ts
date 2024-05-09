import { ref, computed } from 'vue'
import { defineStore, getActivePinia } from 'pinia'
import type { Ref } from 'vue'
import type { FeedFrame, Project } from '../definitions/interfaces'

const useProjectStore = defineStore('project', () => {
  const $debug: boolean = (getActivePinia() as any)?._a.config.globalProperties.$debugPinia
  const $useLocalStorage: boolean = (getActivePinia() as any)?._a.config.globalProperties.$useLocalStorage
  const projectList: Ref<Project[] | null> = ref(null)
  const currentProjectId: Ref<string | null> = ref(null)
  const feedFrames: Ref<FeedFrame[]> = ref([])

  // Setters
  const setProjectList = (newValue: Project[], from: string): void => {
    if ($debug) console.log(`%c setProjectList triggered from ${from}`, 'color: green')
    projectList.value = newValue
    // Local storage setter to simulate an API call
    if ($useLocalStorage) localStorage.setItem('projectList', JSON.stringify(projectList.value))
  }

  const setCurrentProjectID = (newValue: string | null, from: string): void => {
    if ($debug) console.log(`%c setCurrentProjectID triggered from ${from}`, 'color: green')
    currentProjectId.value = newValue
  }

  const setFeedFramesTaken = (newValue: FeedFrame[], from: string): void => {
    if ($debug) console.log(`%c setFeedFramesTaken triggered from ${from}`, 'color: green')
    feedFrames.value = newValue
  }

  // Getters
  const getCurrentProjectName = computed((): string | null => {
    if (currentProjectId.value && projectList.value) {
      const foundProject = projectList.value.find((project) => project.id === currentProjectId.value)
      return foundProject ? foundProject.name : null
    }

    return null
  })

  const getProjectById = computed(() => {
    return (projectId: string) => (projectList.value ? projectList.value.find((project) => project.id === projectId) : null)
  })

  return {
    projectList,
    currentProjectId,
    feedFrames,
    setProjectList,
    setCurrentProjectID,
    setFeedFramesTaken,
    getCurrentProjectName,
    getProjectById
  }
})

export { useProjectStore }
