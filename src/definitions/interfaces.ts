export interface FeedFrame {
  image: string
  createdAt: string
  tags: string[]
}

export interface Project {
  id: string
  name: string
  createdAt: string
  feedFrames: FeedFrame[]
}

export interface ProjectStore {
  projectList: Project[] | null
  currentProjectId: string | null
  feedFramesTaken: FeedFrame[]
}
