import { querySelector } from "./query"
import { TimelineData } from "type/types"
import Cell from "./cell"
import Filter from "./filter"
import OptionMenu from "./optionMenu"
import * as util from "./utility"

const timelineDataList: TimelineData[] = []
let timerDisplaySensitiveMedia: NodeJS.Timeout

setTimelineData()

let url = ""
setInterval(() => {
  if (url !== window.location.href) {
    util.consoleLog("main process stop and reload timeline")
    clearInterval(timerDisplaySensitiveMedia)
    setTimelineData()
    url = window.location.href
  }
}, 1000)

function setTimelineData() {
  util.startProcessAfterCreateElement(
    () => document.querySelectorAll<HTMLElement>(querySelector.quaryTimeline),
    () =>
      util.startProcessAfterRemoveElement(
        () =>
          document.querySelectorAll<HTMLElement>(
            querySelector.quaryProgressbar
          ),
        () => {
          document
            .querySelectorAll<HTMLElement>(querySelector.quaryTimeline)
            ?.forEach((timeline, i) => {
              const timelineDetail = timeline.children.item(0)

              const timelineHeaderTitle1 = timelineDetail?.children
                .item(0)
                ?.querySelector("div[data-testid='root'] h1 > span")
              const timelineHeaderTitle2 = timelineDetail?.children
                .item(0)
                ?.querySelector("div[data-testid='root'] h2 > span > span")

              const title1 = timelineHeaderTitle1?.textContent
              const title2 = timelineHeaderTitle2?.textContent

              const setAutoDisplaySensitiveMedia =
                window.localStorage.getItem(
                  `BXP_${title1}_${title2}_setAutoDisplaySensitiveMedia`
                ) ?? "true"

              util.consoleLog(
                `BXP_${title1}_${title2}_setAutoDisplaySensitiveMedia  ${setAutoDisplaySensitiveMedia}`
              )

              const setFilterIncludeMedia =
                window.localStorage.getItem(
                  `BXP_${title1}_${title2}_setFilterIncludeMedia`
                ) ?? "false"

              util.consoleLog(
                `BXP_${title1}_${title2}_setFilterIncludeMedia  ${setFilterIncludeMedia}`
              )

              if (title1 && title2) {
                const listNotificationArticle = timeline.querySelectorAll(
                  `${querySelector.quaryArticleCell}  article[role='article'][data-testid='notification']`
                )
                const listTweetArticle = timeline.querySelectorAll(
                  `${querySelector.quaryArticleCell} article[role='article'][data-testid='tweet']`
                )

                if (listNotificationArticle.length > 0) {
                  timelineDataList.push({
                    timelineTitle1: title1,
                    timelineTitle2: title2,
                    timelineNode: timeline,
                    timelineType: "notification",
                    setAutoDisplaySensitiveMedia:
                      setAutoDisplaySensitiveMedia === "true",
                    setFilterIncludeMedia: setFilterIncludeMedia === "true"
                  })
                } else if (listTweetArticle.length > 0) {
                  timelineDataList.push({
                    timelineTitle1: title1,
                    timelineTitle2: title2,
                    timelineNode: timeline,
                    timelineType: "tweet",
                    setAutoDisplaySensitiveMedia:
                      setAutoDisplaySensitiveMedia === "true",
                    setFilterIncludeMedia: setFilterIncludeMedia === "true"
                  })
                } else {
                  timelineDataList.push({
                    timelineTitle1: title1,
                    timelineTitle2: title2,
                    timelineNode: timeline,
                    timelineType: "other",
                    setAutoDisplaySensitiveMedia:
                      setAutoDisplaySensitiveMedia === "true",
                    setFilterIncludeMedia: setFilterIncludeMedia === "true"
                  })
                }
              }
            })

          util.consoleLog("Set timelines:", timelineDataList)
          main()
        }
      )
  )
}

function main() {
  util.consoleLog("main process strat......")

  timerDisplaySensitiveMedia = setInterval(() => {
    timelineDataList.forEach((timelineData) => {
      const cell = new Cell(timelineData)
      const optionMenu = new OptionMenu(timelineData)
      const filter = new Filter(timelineData)

      cell.main()
      optionMenu.main()
      filter.main()
    }, 1000)
  })
}
