import Timeline from "./components/timeline"
import { querySelector } from "./components/query"
import * as util from "./utility"

const timelineList: Timeline[] = []
let url = ""
let preActiveElement: Element

const observer = new MutationObserver(records => {
  setTimelineData()
})

url = window.location.href
checkPageReload()
setTimelineDataList()

function checkPageReload() {
  setInterval(() => {
    checkReload()
    checkFormActive()
  }, 1000)
}

function checkReload() {
  if (url !== window.location.href) {
    util.consoleLog("main process stop and reload timeline")

    clearTimelineData()
    setTimelineDataList()
    url = window.location.href
  }
}

function checkFormActive() {
  const activeElement = document?.activeElement
  if (activeElement && preActiveElement !== activeElement) {
    // const dataTestId = activeElement.getAttribute('data-testid')
    preActiveElement = activeElement
  }
}

function clearTimelineData() {
  timelineList.splice(0, timelineList.length)
}

function setTimelineDataList() {
  util.startProcessAfterCreateElement(
    () => document.querySelectorAll<HTMLElement>(querySelector.quaryTimeline),
    () =>
      util.startProcessAfterRemoveElement(
        () => document.querySelectorAll<HTMLElement>(querySelector.quaryProgressbar),
        () => setTimelineData()
      )
  )
}

function setTimelineData() {
  document.querySelectorAll<HTMLElement>(querySelector.quaryTimeline)
    ?.forEach((timeline, i) => {
      const timelineDetail = timeline.children.item(0)
      const timelineHeadermainTitle = timelineDetail?.children
        .item(0)?.querySelector("div[data-testid='root'] h1 > span")
      const timelineHeadersubTitle = timelineDetail?.children
        .item(0)?.querySelector("div[data-testid='root'] h2 > span > span")

      const mainTitle = timelineHeadermainTitle?.textContent
      const subTitle = timelineHeadersubTitle?.textContent
      if (mainTitle && subTitle) {
        timelineList.push(new Timeline(mainTitle, subTitle, timeline))

        const timelineHeader = timeline.querySelector(querySelector.quaryTimelineSubHeader)
        if (timelineHeader) {
          observer.observe(timelineHeader, {
            childList: true
          })
        }
      }
    })

  util.consoleLog("main process strat......")
}