import { json } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import { Link, useLoaderData, useFetcher } from "@remix-run/react";
import axios from "axios"

type NewsItem = {
  "by": string,
  "descendants": number,
  "id": string,
  "kids": string[],
  "score": number,
  "time": number,
  "title": string,
  "type": string,
  "url": string
}

export const loader = async ({params}: LoaderArgs) => {
  let newsList = []

  const getNewsItem = async (id: string):Promise<NewsItem | undefined> => {
    try {
      const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      return res.data
    } catch (error) {
      return undefined
    }
  }

  try {
		const res = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')

    newsList = await Promise.all(
      res.data.slice(0, 100).map((id:string) => getNewsItem(id))
    )

	} catch (error) {
    return (error as Error).message
  }

  return newsList
}

export default function Index() {
  const data = useLoaderData<NewsItem[] | undefined>()
  const fetcher = useFetcher()

  console.log('data', data)


  return (
    <div>
      <h1>Index</h1>
      
      {(typeof data !== 'string') ?
        data.map((newstorie, index) => {return ( 
            <div key = {newstorie.id}>
              <Link to={newstorie.id.toString()} >{newstorie.title}</Link>
            </div>
          )}
        )
      : data}

      
    </div>
  );
}
