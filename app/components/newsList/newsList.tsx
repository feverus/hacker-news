import useNewsList from './newsList.service'
import { NewsItem } from '~/interfaces'
import { setStore } from 'store/setStore'
import { NewsItemBlock } from './newsItemBlock'

export function NewsList(props: {newsItems: NewsItem[]}) {
	const [state] = useNewsList(props.newsItems)

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

