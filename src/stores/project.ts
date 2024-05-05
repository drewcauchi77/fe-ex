import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { FeedFrame, Project, ProjectStore } from '@/definitions/interfaces'

const useProjectStore = defineStore('project', () => {
  const state = reactive<ProjectStore>({
    projectList: null,
    project: {
      name: null,
      createdAt: null,
      feedFrames: []
    }
  })

  const setProjectList = (newValue: Project[], from: string): void => {
    console.log(`%c setProjectList triggered from ${from}`, 'color: green')
    state.projectList = newValue
    localStorage.setItem('projectList', JSON.stringify(state.projectList))
  }

  const createProject = (newValue: string, from: string): void => {
    console.log(`%c createProject triggered from ${from}`, 'color: green')
    state.project.name = newValue
    state.project.createdAt = new Date().toLocaleString()
  }

  const resetCreatedProject = (from: string): void => {
    console.log(`%c resetCreatedProject triggered from ${from}`, 'color: green')
    state.project = Object.assign({}, state.project, {
      name: null,
      createdAt: null,
      feedFrames: []
    })
  }

  const setCreatedProjectFrames = (newValue: FeedFrame[], from: string): void => {
    console.log(`%c setCreatedProjectFrames triggered from ${from}`, 'color: green')
    state.project.feedFrames = newValue
  }

  return {
    state,
    setProjectList,
    createProject,
    resetCreatedProject,
    setCreatedProjectFrames
  }
})

export { useProjectStore }
