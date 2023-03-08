import { useState, useEffect } from 'react'
import { NewsList } from "./newsList.props"
import { getNewsItems, getNewsList } from "~/api"
import * as dotenv from 'dotenv'

const useNewsList:NewsList = (newsItems) => {
    const [items, setItems] = useState(newsItems)    

    const updateIds = async () => {
        const ids = items.map(item => item.id)

        console.log('Попытка обновления списка новостей')

        let newIds = await getNewsList()
        if (typeof newIds === 'string') {
            console.log('Ошибка получения списка новостей: ',newIds) 
            return
        }
        newIds = newIds.slice(0, 100)
        const missedIds = newIds.filter(id => !ids.includes(id))
        if (missedIds.length === 0) {
            console.log('Новых новостей нет') 
            return
        }
        const missedNews = await getNewsItems(missedIds)

        let newItems = missedNews.concat(items)
        newItems = newItems.filter(item => (newIds as number[]).includes(item.id))
        console.log('Новых новостей: ' + missedNews.length)
        setItems(newItems)
    }

    useEffect(() => {
        const intervalUpdate = setInterval(updateIds, 60000)
        return function cleanup() {
            clearInterval(intervalUpdate)
          }
    }, [])


    const state = {
        newsItems: items,
    }
    const api = {
        updateIds: updateIds,
    }
    
    return (
        [state, api]
    )
}

export default useNewsList