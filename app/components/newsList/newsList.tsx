import useNewsList from './newsList.service'
import { NewsItem } from '~/interfaces'
import { setStore } from 'store/setStore'
import { NewsItemBlock } from './newsItemBlock'

export function NewsList(props: {newsItems: NewsItem[]}) {
	const [state, api] = useNewsList(props.newsItems)
	console.log(state)
	console.log(setStore)

	return (
		<>
		{state.newsItems.map((newstorie, index) => { 
			return newstorie &&  
				NewsItemBlock(newstorie, index)
			}
		)}
		</>
	)
}

