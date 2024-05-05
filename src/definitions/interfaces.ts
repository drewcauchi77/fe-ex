export interface FeedFrame {
  image: string
  createdAt: string
}

export interface Project {
  name: string | null
  createdAt: string | null
  feedFrames: FeedFrame[]
}

export interface ProjectStore {
  projectList: Project[] | null
  project: Project
}
