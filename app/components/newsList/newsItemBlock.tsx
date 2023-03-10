import { NewsItem } from '~/interfaces'
import { Link } from "@remix-run/react"
import { commentsOfNum, dateStampToDate } from '~/service/textFunction'

export function NewsItemBlock(newStorie: NewsItem, index: number = -1): JSX.Element {
	const one = index === -1

	const publishDate = dateStampToDate(newStorie.time)

	const title = one? 
		<h1>{newStorie.title}</h1>
		:
		<><span>{newStorie.id}</span> : <h1>{newStorie.title}</h1></>
	
	const link = one?	
		<div className='link'>
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
		<><span>Рейтинг:</span> {newStorie.score}</>

	const comments = (newStorie.descendants === 0)?
		'Без комментариев'
		:
		`${newStorie.descendants} ${commentsOfNum(newStorie.descendants)}`

	const content = <>
		<div>
			{title}
		</div>
		{link}
		<div className='comments'>
			{comments}
		</div>
		<div className='status'>
			<div>{score}</div>
			<div><span>Автор:</span> {newStorie.by}</div>
			<div><span>Дата публикации:</span> {publishDate}</div>
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