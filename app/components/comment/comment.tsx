import useComment from './comment.service'
import { NewsItem } from '~/interfaces'
import { Link } from "@remix-run/react"
import { setStore } from 'store/setStore'
import { dateStampToDate } from '~/service/textFunction'

export function Comment(props: {id: number, depth: number}) {
	const [state, api] = useComment(props.id)

	if (!state.comment) return <></>

	if (state.comment.dead || state.comment.deleted) return (
		<div className = {'comment comment_level_' + props.depth % 5}>
			Комментарий удалён
		</div>
	)

	const commentText = 
		<>	
			<div><h2>{state.comment.by} :</h2></div>
			<div className='comment_text'
			dangerouslySetInnerHTML = {{__html:state.comment.text}}></div>
			<div>{dateStampToDate(state.comment.time)}</div>
		</>

	return (		
		<>
			{(state.comment.kids) ?
				<button
					onClick = {api.toggleShowKids}
					className = {'comment haveKids'}
				>
					{commentText}
				</button>
				:
				<div
					className = {'comment'}
				>
					{commentText}
				</div>
			}
			{state.showKids && state.comment.kids &&
				state.comment.kids.map(id => 
					<div key={id} className = {'comment_block comment_block'}>
						<Comment id={id} depth={props.depth + 1} />
					</div>				
				)
			}

		</>
	)
}