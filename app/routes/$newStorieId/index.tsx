import { useEffect } from "react"
import type { LoaderArgs  } from "@remix-run/node"
import { useFetcher, useLoaderData  } from "@remix-run/react"
import { getNewsItem } from "~/api"
import Comment from "~/components/comment"
import Layout from "~/components/newsLayout"
import { setStore } from "store/setStore"
import {observer} from "mobx-react"
import { NewsItemBlock } from "~/components/newsList"

export const loader = async ({params}: LoaderArgs) => {
  console.log('args', params)
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
    console.log('forceRefresh')
    if (typeof data !== 'string') fetcher.load('/'+data?.id)
    setStore.setForceRefresh(false)
  }, [setStore.forceRefresh])

  console.log('data', data)

  if (typeof data == 'string') return (
    <Layout autoUpdateChekbox = {false} backButton = {true}>
      {data}
    </Layout>
  )

  return (
    <Layout autoUpdateChekbox = {false} backButton = {true}>     
       {(data?.dead || data?.deleted) ?
          'Ой! Новость удалена.'
          :
          <>
            {NewsItemBlock(data)}
            {kids?.map(id => <Comment id={id} depth={0} key={id} />)}
          </>
       }
    </Layout>
  )
})
