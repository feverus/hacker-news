import Header from "../header"
import useAnimations from './newsLayout.service'

type P = {
    children: JSX.Element | string,
		autoUpdateChekbox: boolean,
		backButton: boolean,
}

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Layout(props: P) {
  const mainRef = useAnimations();

	return (    
				<div className="wrapper" ref={mainRef}>
					<Header 			
						autoUpdateChekbox = {props.autoUpdateChekbox}
						backButton = {props.backButton}
					/>	
					<main>			
						{props.children}			
					</main>
				</div>
	)
}