export type TimelineType = "tweet" | "notification" | "other"

export interface TimerData {
  timer: NodeJS.Timeout
  status: "loading" | "complaeted"
}
