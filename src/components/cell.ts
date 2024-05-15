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

    if (this.timelineType === "other") {
      return
    }

    const target = this.timelineNode.querySelector("section[role='region'] > div.css-175oi2r > div")
    if (target) {
      this.observer.observe(target, {
        childList: true
      })
      this.main()
    }
  }

  private main() {
    consoleLog(`cell process start`)

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
        const item = val.children.item(1) as HTMLElement
        item.click()
      })
  }
}
