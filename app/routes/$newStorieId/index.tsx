import { useEffect } from "react"
import type { LoaderArgs  } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { getNewsItem } from "~/api"
import Comment from "~/components/comment"
import NewsLayout from "~/components/newsLayout"
import { setStore } from "~/store/setStore"
import {observer} from "mobx-react"
import NewsItemBlock from '~/components/newsItemBlock'

export const loader = async ({params}: LoaderArgs) => {
  if (params.newStorieId)
    try {
      const res = await getNewsItem(Number(params.newStorieId))
      return res
    } catch (error) {
      return (error as Error).message
    }
}

export default observer(function NewStorie() {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  
  const kids = (typeof data !== 'string') ?
    data.kids?.sort((a, b) => a - b) 
    :
    []

  useEffect(() => {
    if (typeof data !== 'string') fetcher.load('/'+data?.id)
    setStore.setForceRefresh(false)
  }, [setStore.forceRefresh])

  if (typeof data == 'string') return (
    <NewsLayout autoUpdateChekbox = {false} backButton = {true}>
      {data}
    </NewsLayout>
  )

  return (
    <NewsLayout autoUpdateChekbox = {false} backButton = {true}>     
       {(data?.dead || data?.deleted) ?
          'Ой! Новость удалена.'
          :
          <>
            <NewsItemBlock newStorie={data} index={-1} key={data.id}/>
            {kids?.map(id => <Comment id={id} depth={0} key={id} />)}
          </>
       }
    </NewsLayout>
  )
})
