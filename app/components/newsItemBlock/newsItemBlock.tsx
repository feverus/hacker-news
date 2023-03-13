import { NewsItem } from '~/interfaces'
import { useNewsItemBlock } from './newsItemBlock.service'

export function NewsItemBlock(props: {newStorie: NewsItem, index: number}) {
	const [state, api] = useNewsItemBlock(props.newStorie, props.index)

	if (state.one) return (
		<div className='newsItem'>
			{state.content}				
		</div>
	)

	return (
		<a
			onClick={() => api.goTo('/'+props.newStorie.id.toString())}
			className='newsItem'
		>
			{state.content}				
		</a>
	)
}