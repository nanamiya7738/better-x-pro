import Cell from "./cell"
import Filter from "./filter"
import { querySelector } from "./query"
import Settings from "./settings"
import { TimelineType } from "../types"
import { consoleLog } from "../utility"

export default class Timeline {

    timelineMainTitle!: string
    timelineSubTitle!: string
    timelineNode!: HTMLElement
    timelineType!: TimelineType
    rowOptionMenu!: Element | null

    settings!: Settings

    cell!: Cell
    filter!: Filter

    constructor(mainTitle: string, subTitle: string, timelineNode: HTMLElement) {
        this.settings = new Settings(mainTitle, subTitle)

        this.timelineNode = timelineNode
        this.timelineMainTitle = mainTitle
        this.timelineSubTitle = subTitle
        this.setTimelineType()

        this.cell = new Cell(this.timelineNode, this.timelineType, this.settings)
        this.filter = new Filter(this.timelineNode, this.timelineType, this.settings)
        this.setOption()
    }

    private setTimelineType() {
        const listNotificationArticle = this.timelineNode.querySelectorAll(
            `${querySelector.quaryArticleCell}  article[role='article'][data-testid='notification']`
        )
        const listTweetArticle = this.timelineNode.querySelectorAll(
            `${querySelector.quaryArticleCell} article[role='article'][data-testid='tweet']`
        )

        if (listNotificationArticle.length > 0) {
            this.timelineType = "notification"
        } else if (listTweetArticle.length > 0) {
            this.timelineType = "tweet"
        } else {
            this.timelineType = "other"
        }
    }

    private setOption() {
        this.timelineNode.querySelectorAll<HTMLDivElement>("div.r-18u37iz > div.r-obd0qt.r-1777fci div[role='button']").forEach(button => {
            button.addEventListener("click", () => {
                setTimeout(() => this.setRowOptionMenu(), 1000)
            })
        })
    }

    private getRowOptionNode() {
        const listRowOptionMenu = this.timelineNode.querySelectorAll<HTMLElement>(
            querySelector.quaryRowOptionMenu
        )
        if (listRowOptionMenu.length === 0) {
            return
        }
        return listRowOptionMenu.item(0).children.item(0)?.children.item(1)?.children.item(0) ?? null
    }

    private setRowOptionMenu() {
        const rowOptionMenu = this.getRowOptionNode()
        if (!rowOptionMenu) return
        if (rowOptionMenu.querySelector("div#customMenuItems")) return

        consoleLog("Menuitem add.")


        rowOptionMenu?.appendChild(
            this.createMenuItem(
                // "Enable automatically display of sensitive media",
                "BXP: センシティブ画像を常に表示する",
                this.settings.getEnableAutoDisplay(),
                () => {
                    this.settings.setEnableAutoDisplay(!this.settings.getEnableAutoDisplay())
                    this.cell = new Cell(this.timelineNode, this.timelineType, this.settings)
                }
            )
        )

        if (this.timelineType === "tweet") {
            rowOptionMenu?.appendChild(
                this.createMenuItem(
                    // "Enable filter to show only tweets containing media",
                    "BXP: メディアを含むツイートのみ表示する",
                    this.settings.getEnableFillterMedia(),
                    () => {
                        this.settings.setEnableFillterMedia(!this.settings.getEnableFillterMedia())
                        this.filter = new Filter(this.timelineNode, this.timelineType, this.settings)
                    }
                )
            )
        }
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