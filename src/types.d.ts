export type TimelineType = "tweet" | "notification" | "list" | "directMessage" | "other"

export interface TimerData {
  timer: NodeJS.Timeout
  status: "loading" | "complaeted"
}
