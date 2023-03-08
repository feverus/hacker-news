import { json } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import { Link, Outlet, useLoaderData  } from "@remix-run/react"
import axios from "axios"
import { getNewsItem } from "~/api"

export const loader = async ({params}: LoaderArgs) => {
  console.log('args', params)
  if (params.newStorieId)
    try {
      const res = await getNewsItem(params.newStorieId)
      return res
    } catch (error) {
      return (error as Error).message
    }
}

export default function NewStorie() {
  const data = useLoaderData<typeof loader>();
  console.log('data', data)

  return (
    <div>
      <h1>NewStorie</h1>

      {(typeof data !== 'string') ?
        data.title
        :
        data
      }


    </div>
  );
}
