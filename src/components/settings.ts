import { consoleLog } from "../utility"

class SettingDetail {
    storageName!: string
    value!: boolean

    constructor(storageName: string) {
        this.storageName = storageName
        const temp = window.localStorage.getItem(storageName)

        if (temp === null) {
            this.value = false
        } else {
            this.value = temp === "true"
        }
        consoleLog(`${storageName} ${this.value}`)
    }

    public getValue() {
        return this.value
    }

    public setValue(val: boolean) {
        this.value = val
        window.localStorage.setItem(this.storageName, String(this.value))
    }
}

export default class Settings {

    private enableAutoDisplay!: SettingDetail
    private enableFillterMedia!: SettingDetail

    constructor(mainTitle: string, subTitle: string) {
        this.enableAutoDisplay = new SettingDetail(`BXP_${mainTitle}_${subTitle}_setAutoDisplaySensitiveMedia`)
        this.enableFillterMedia = new SettingDetail(`BXP_${mainTitle}_${subTitle}_setFilterIncludeMedia`)
    }

    public getEnableAutoDisplay() {
        return this.enableAutoDisplay.getValue()
    }

    public setEnableAutoDisplay(enable: boolean) {
        this.enableAutoDisplay.setValue(enable)
    }

    public getEnableFillterMedia() {
        return this.enableFillterMedia.getValue()
    }

    public setEnableFillterMedia(enable: boolean) {
        this.enableFillterMedia.setValue(enable)
    }
}