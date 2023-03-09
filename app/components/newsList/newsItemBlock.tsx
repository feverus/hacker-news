import { NewsItem } from '~/interfaces'
import { Link } from "@remix-run/react"
import { commentsOfNum, dateStampToDate } from '~/service/textFunction'

export function NewsItemBlock(newStorie: NewsItem, index: number = -1): JSX.Element {
	const one = index === -1

	const publishDate = dateStampToDate(newStorie.time)

	const title = one? 
		newStorie.title
		:
		`${index} : ${newStorie.title}` 
	
	const link = one?	
		<div>
			<a href = {newStorie.url}
				className='cut'>
				{newStorie.url}
			</a>
		</div>
		:
		''

	const score = one?
		''
		:
		`Рейтинг: ${newStorie.score}`

	const comments = (newStorie.descendants === 0)?
		'Без комментариев'
		:
		`${newStorie.descendants} ${commentsOfNum(newStorie.descendants)}`

	const content = <>
		<div>
			<h1>{title}</h1>
		</div>
		{link}
		<div className='comments'>
			{comments}
		</div>
		<div className='status'>
			<div>{score}</div>
			<div>Автор: {newStorie.by}</div>
			<div>Дата публикации: {publishDate}</div>
		</div>
	</>

	if (one) return (
		<div className='newsItem'>
			{content}				
		</div>
	)

	return (
		<Link
			to={newStorie.id.toString()}
			key={newStorie.id}
			className='newsItem'
		>
			{content}				
		</Link>
	)


}