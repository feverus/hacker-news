import {useRef, useEffect, useLayoutEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const useAnimations = () => {
  const mainRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {		
    const ctx = gsap.context((self) => {
			if ((self !== undefined) && (self.selector !== undefined)) {		
      	const newsItem = self.selector('.newsItem')

				newsItem.forEach((item: gsap.DOMTarget) => {
					gsap
						.set(item, { autoAlpha: 0, xPercent: -100, scale: 0.1 });
					gsap
						.timeline(
							{scrollTrigger: {
									trigger: item,
									start: 'top bottom',
									end: "+=500",
								},
							paused: true}
						)
						.to(item,	
							{ autoAlpha: 0.5, xPercent: 0, scale: 0.5, duration: 0.25 })		
						.to(item,	
							{ autoAlpha: 1, scale: 1, duration: 0.25 })		
				})

      	const headerButtons = self.selector('header>button, header>.box')

				headerButtons.forEach((item: gsap.DOMTarget) => {
					gsap
						.set(item, { autoAlpha: 0, yPercent: -100 });
					gsap
						.timeline(
							{scrollTrigger: {
									trigger: item,
									start: 'top bottom',
									end: "+=500",
								},
							paused: true}
						)
						.to(item,	
							{ autoAlpha: 0.5, yPercent: 0, duration: 0.25 })		
						.to(item,	
							{ autoAlpha: 1, duration: 0.25 })		
				})

			}
    }, mainRef);
  }, [])

  return mainRef
}

export default useAnimations