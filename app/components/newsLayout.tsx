import Header from "./header"

type P = {
    children: JSX.Element | string,
		autoUpdateChekbox: boolean,
		backButton: boolean,
}

export default function Layout(props: P) {

	return (
		<>
			<Header 			
				autoUpdateChekbox = {props.autoUpdateChekbox}
				backButton = {props.backButton}
			/>
			<main>			
				{props.children}			
			</main> 	
		</>
	)
}