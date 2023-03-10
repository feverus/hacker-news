import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import main from "~/styles/main.css"
import header from "~/styles/header.css"
import newsList from "~/styles/newsList.css"
import comment from "~/styles/comment.css"

export function links() {
	return [
	  { rel: "stylesheet", href: main, },
	  { rel: "stylesheet", href: header, },
	  { rel: "stylesheet", href: newsList, },
	  { rel: "stylesheet", href: comment, },
	]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hacker news interface",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <html lang="ru">
      <head>
        <Meta />
        <Links />
      </head>
      <body>      
        <Outlet />	
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
