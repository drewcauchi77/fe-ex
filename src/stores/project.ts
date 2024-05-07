import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FeedFrame, Project, ProjectStore } from '@/definitions/interfaces'

const useProjectStore = defineStore('project', () => {
  const state = reactive<ProjectStore>({
    projectList: null,
    currentProjectId: null,
    feedFramesTaken: []
  })

  const getProjectList = computed(() => state.projectList ?? null)
  const getCurrentProjectId = computed(() => state.currentProjectId ?? null)
  const getFeedFramesTaken = computed(() => state.feedFramesTaken ?? [])

  const getCurrentProject = computed(() =>
    state.projectList ? state.projectList.find((project) => project.id === state.currentProjectId) : null
  )
  const getCurrentProjectName = computed(() => {
    if (state.currentProjectId && state.projectList) {
      const foundProject = state.projectList.find((project) => project.id === state.currentProjectId)
      return foundProject ? foundProject.name : null
    }

    return null
  })

  const setProjectList = (newValue: Project[], from: string): void => {
    console.log(`%c setProjectList triggered from ${from}`, 'color: green')
    state.projectList = newValue
    localStorage.setItem('projectList', JSON.stringify(state.projectList))
  }

  const setCurrentProjectID = (newValue: string | null, from: string): void => {
    console.log(`%c setCurrentProjectID triggered from ${from}`, 'color: green')
    state.currentProjectId = newValue
  }

  const setFeedFramesTaken = (newValue: FeedFrame[], from: string): void => {
    console.log(`%c setFeedFramesTaken triggered from ${from}`, 'color: green')
    state.feedFramesTaken = newValue
  }

  return {
    getProjectList,
    getCurrentProjectId,
    getFeedFramesTaken,
    getCurrentProject,
    getCurrentProjectName,
    setProjectList,
    setCurrentProjectID,
    setFeedFramesTaken
  }
})

export { useProjectStore }
