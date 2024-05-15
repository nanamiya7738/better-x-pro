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

    if (this.timelineType !== "tweet") {
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
    consoleLog(`fillter process start`)

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

        if (tweetDetail?.children && tweetDetail?.children.length <= 3) {
          tweetArticle.hidden = true
        } else {
          const tweetMedia = tweetDetail?.querySelector("div[aria-labelledby]")
          if (!tweetMedia) {
            tweetArticle.hidden = true
          }
        }
      })

  }
}
