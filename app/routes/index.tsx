import type { LoaderArgs } from "@remix-run/node"
import type { NewsItem } from "~/interfaces";
import { useLoaderData } from "@remix-run/react";
import { getNewsItems, getNewsList } from "~/api"
import { NewsList } from "~/components/newsList";



export const loader = async ({params}: LoaderArgs) => {
  let newsItems: NewsItem[] = []
  
  try {
		const newsIds = await getNewsList()

    if (typeof newsIds !== 'string') newsItems = await getNewsItems(newsIds)

	} catch (error) {
    return (error as Error).message
  }

  return newsItems.filter(item => item !== undefined)
}

export default function Index() {
  const newsItems = useLoaderData<typeof loader>()

  console.log('data', newsItems)

  return (
    <div>
      <h1>Index</h1>
      
      {((typeof newsItems !== 'string') && (newsItems !== null)) ?
        <NewsList newsItems={newsItems} />
      : newsItems} 
    
    </div>    
  )
}
