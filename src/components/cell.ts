import { consoleLog } from "../utility"
import { TimelineType } from "../types"
import { querySelector } from "./query"
import Settings from "./settings"

export default class Cell {

  timelineNode!: HTMLElement
  timelineType!: TimelineType
  settings!: Settings

  observer = new MutationObserver(records => {
    this.main()
  })

  constructor(timelineNode: HTMLElement, timelineType: TimelineType, settings: Settings) {
    this.timelineNode = timelineNode
    this.timelineType = timelineType
    this.settings = settings

    const timelineList = this.timelineNode.querySelector(querySelector.quaryTimelineList)
    if (timelineList) {
      this.observer.observe(timelineList, {
        childList: true
      })
    }
    this.main()
  }

  private main() {
    if (this.timelineType !== "tweet") {
      return
    }
    if (!this.settings.getEnableAutoDisplay()) {
      return
    }
    this.timelineNode
      .querySelectorAll<HTMLElement>(`${querySelector.quarySensitiveMedia}`)
      .forEach((val) => {
        val.click()
      })

    this.timelineNode
      .querySelectorAll<HTMLElement>(`${querySelector.quarySensitiveContent}`)
      .forEach((val) => {
        val.click()
      })
  }
}
