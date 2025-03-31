export interface Post {
  id: string
  xsec_token: string
  cover: string
  title: string
  publish_time: string
  user: {
    user_id: string
    nickname: string
    avatar: string
    xsec_token: string
  }
  interact_info: {
    liked_count: number
    collected_count: number
    comment_count: number
  }
  imageList: string[]
  is_video: boolean
}

export interface SearchOptions {
  sort: string
  type: string
  limit: number
  page: number
  collectDetail: boolean
} 