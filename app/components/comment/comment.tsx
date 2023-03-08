import useComment from './comment.service'
import { NewsItem } from '~/interfaces'
import { Link } from "@remix-run/react"

export function Comment(props: {id: number, depth: number}) {
	const [state, api] = useComment(props.id)
	console.log(state)
	console.log(state.comment?.kids)

	return (
		state.comment ?
		<>
			<button
				onClick = {api.toggleShowKids}
				className = {'comment commentLevel_' + props.depth % 5}
			>
				{state.comment.text}
			</button>

			{state.showKids && state.comment.kids &&
				state.comment.kids.map(id => <Comment id={id} depth={props.depth + 1} key={id} />)
			}

		</>
		: <></>
	)
}