import type { LoaderArgs } from "@remix-run/node"
import { Link, Outlet, useLoaderData  } from "@remix-run/react"
import { getNewsItem } from "~/api"
import { Comment } from "~/components/comment"

import styles from "~/styles/comment.module.css"
export function links() {
	return [
	  {
      rel: "stylesheet",
      href: styles,
	  },
	];
}

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

export default function NewStorie() {
  const data = useLoaderData<typeof loader>();
  console.log('data', data)

  return (
    <div>
      <h1>NewStorie</h1>

      {(typeof data !== 'string') ?
        <>
          <h2>{data.title}</h2>
          {data.kids.map(id => <Comment id={id} depth={0} key={id} />)}
        </>
        :
        data
      }


    </div>
  );
}
