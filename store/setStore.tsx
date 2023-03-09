import {makeAutoObservable, observable, action} from 'mobx'
import { useStaticRendering } from "mobx-react"

const isServer = typeof window === "undefined"
useStaticRendering(isServer)

export class SetStore {
    autoRefresh:boolean = true
    forceRefresh:boolean = false

    constructor() {
        makeAutoObservable(this, {
            autoRefresh: observable,
            forceRefresh: observable,
            setAutoRefresh: action,
            setForceRefresh: action,
        })        
    }
    
    setAutoRefresh(mode: boolean) {
        this.autoRefresh = mode
    }
    setForceRefresh(mode: boolean) {
        this.forceRefresh = mode
    }
}

export const setStore = new SetStore()