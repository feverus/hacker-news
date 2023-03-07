import { json } from "@remix-run/node"
import type { LoaderArgs } from "@remix-run/node"
import { Link, Outlet, useLoaderData  } from "@remix-run/react"
import axios from "axios"

export const loader = async ({params}: LoaderArgs) => {
  console.log('args', params)

  try {
		const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.newStorieId}.json`)
		return res.data
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
      <Outlet />
      {data.title}
      <Link to="comment_1">comment_1</Link>

    </div>
  );
}
