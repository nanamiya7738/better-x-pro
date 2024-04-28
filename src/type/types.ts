export interface TimelineData {
  timelineNode: HTMLElement
  timelineTitle1: string
  timelineTitle2: string
  timelineType: "tweet" | "notification" | "other"
  setAutoDisplaySensitiveMedia: boolean
  setFilterIncludeMedia: boolean
}

export interface TimerData {
  timer: NodeJS.Timeout
  status: "loading" | "complaeted"
}
