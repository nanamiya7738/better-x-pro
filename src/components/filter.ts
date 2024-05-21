import { consoleLog } from "../utility"
import { TimelineType } from "../types"
import { querySelector } from "./query"
import Settings from "./settings"

export default class Filter {

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
    if (!this.settings.getEnableFillterMedia()) {
      return
    }

    const timelineHeader = this.timelineNode.children
      .item(0)
      ?.querySelector(querySelector.quaryTimelineHeader)
    if (timelineHeader) {
      return
    }

    this.timelineNode
      .querySelectorAll<HTMLElement>(querySelector.quaryArticleCell)
      .forEach((tweetArticle) => {
        const tweetDetail = tweetArticle.querySelector<HTMLElement>(
          querySelector.quaryTweetDetail
        )
        if (tweetDetail === null) {
          tweetArticle.hidden = true
          tweetArticle.style.display = 'none'
        }
      })
  }
}
