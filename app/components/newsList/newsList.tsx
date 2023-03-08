import useNewsList from './newsList.service'
import C from './newsList.module.scss'
import { NewsItem } from '~/interfaces'
import { Link } from "@remix-run/react";

export function NewsList(props: {newsItems: NewsItem[]}) {
	const [state, api] = useNewsList(props.newsItems)
	console.log(state)
	
	return (
		<>
		<button onClick={api.updateIds}>
			Обновить
		</button>
		{state.newsItems.map((newstorie, index) => { 
			return newstorie &&  
				<div key = {newstorie.id}>
					<Link to={newstorie.id.toString()} >{index+' '+newstorie.title}</Link>
				</div>
			}
		)}
		</>
	)
}