import { TimelineData } from "type/types"
import { querySelector } from "./query"
import * as util from "./utility"

export default class OptionMenu {
  private timelineData: TimelineData

  constructor(timelineData: TimelineData) {
    this.timelineData = timelineData
  }

  public main() {
    this.addItemToRowOptionMenu()
  }

  private addItemToRowOptionMenu() {
    if (this.timelineData.timelineType !== "tweet") {
      return
    }

    let listRowOptionMenu: null | NodeListOf<HTMLElement> =
      this.timelineData.timelineNode.querySelectorAll<HTMLElement>(
        querySelector.quaryRowOptionMenu
      )
    if (listRowOptionMenu.length === 0) {
      return
    }

    let rowOptionCustomMenuItems = this.timelineData.timelineNode.querySelector(
      querySelector.quaryRowOptionCustomMenuItems
    )
    if (rowOptionCustomMenuItems) {
      return
    }

    util.consoleLog("Menuitem add.")

    const rowOptionMenu = listRowOptionMenu
      .item(0)
      .children.item(0)
      ?.children.item(1)
      ?.children.item(0)

    rowOptionMenu?.appendChild(
      this.createMenuItem(
        // "Enable automatically display of sensitive media",
        "センシティブ画像を常に表示する",
        this.timelineData.setAutoDisplaySensitiveMedia,
        () => {
          this.timelineData.setAutoDisplaySensitiveMedia =
            !this.timelineData.setAutoDisplaySensitiveMedia

          window.localStorage.setItem(
            `BXP_${this.timelineData.timelineTitle1}_${this.timelineData.timelineTitle2}_setAutoDisplaySensitiveMedia`,
            String(this.timelineData.setAutoDisplaySensitiveMedia)
          )
        }
      )
    )
    rowOptionMenu?.appendChild(
      this.createMenuItem(
        // "Enable filter to show only tweets containing media",
        "メディアを含むツイートのみ表示する",
        this.timelineData.setFilterIncludeMedia,
        () => {
          this.timelineData.setFilterIncludeMedia =
            !this.timelineData.setFilterIncludeMedia
          window.localStorage.setItem(
            `BXP_${this.timelineData.timelineTitle1}_${this.timelineData.timelineTitle2}_setFilterIncludeMedia`,
            String(this.timelineData.setFilterIncludeMedia)
          )
        }
      )
    )
  }

  private createMenuItem(
    textMenu: string,
    checkedMenu: boolean,
    onchange: () => void
  ) {
    const menuItemText = document.createElement("span")
    menuItemText.textContent = textMenu

    const menuItemInput = document.createElement("input")
    menuItemInput.type = "checkbox"
    menuItemInput.role = "switch"
    menuItemInput.checked = checkedMenu
    menuItemInput.onchange = onchange

    const menuItem = document.createElement("div")
    menuItem.appendChild(menuItemText)
    menuItem.appendChild(menuItemInput)
    menuItem.classList.add("css-1dbjc4n", "r-18u37iz", "r-1wtj0ep", "r-779j7e")

    const menuItemBox = document.createElement("div")
    menuItemBox.appendChild(menuItem)
    menuItemBox.classList.add("r-z2wwpe", "r-jgcjvd", "r-146eth8")
    menuItem.id = "customMenuItems"

    return menuItemBox
  }
}
