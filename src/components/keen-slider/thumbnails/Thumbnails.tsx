import React, { FC, MutableRefObject, useState } from "react";
import {
	useKeenSlider,
	KeenSliderPlugin,
	KeenSliderInstance
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import scss from "./Thumbnails.module.scss";

import Image from "next/image";
import pic1 from "@/assets/anime1.jpg";
import pic2 from "@/assets/anime2.jpg";
import pic3 from "@/assets/anime3.jpg";
import pic4 from "@/assets/anime4.jpg";
import pic5 from "@/assets/anime5.jpg";
import pic6 from "@/assets/anime6.jpg";
import pic7 from "@/assets/anime7.jpg";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/svgs";

interface imageProps {
	id: number;
	img: any;
}

const images: imageProps[] = [
	{
		id: 1,
		img: pic1
	},
	{
		id: 2,
		img: pic2
	},
	{
		id: 3,
		img: pic3
	},
	{
		id: 4,
		img: pic4
	},
	{
		id: 5,
		img: pic5
	},
	{
		id: 6,
		img: pic6
	},
	{
		id: 7,
		img: pic7
	}
];

function ThumbnailPlugin(
	mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
	return (slider) => {
		function removeActive() {
			slider.slides.forEach((slide) => {
				slide.classList.remove("active");
			});
		}

		function addActive(idx: number) {
			slider.slides[idx].classList.add("active");
		}

		function addClickEvents() {
			slider.slides.forEach((slide, idx) => {
				slide.addEventListener("click", () => {
					if (mainRef.current) mainRef.current.moveToIdx(idx);
				});
			});
		}

		slider.on("created", () => {
			if (!mainRef.current) return;
			addActive(slider.track.details.rel);
			addClickEvents();
			mainRef.current.on("animationStarted", (main) => {
				removeActive();
				const next = main.animator.targetIdx || 0;
				addActive(main.track.absToRel(next));
				slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
			});
		});
	};
}

const Thumbnails: FC = () => {
	const [loaded, setLoaded] = useState<any>(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			// loop: true,

			slides: {
				spacing: 10
			},

			// ! navigation + buttons
			initial: 0,
			created() {
				setLoaded(true);
			}
		}

		// ! auto play
		// [
		// 	(slider) => {
		// 		let timeout: ReturnType<typeof setTimeout>;
		// 		let mouseOver = false;
		//
		// 		function clearNextTimeout() {
		// 			clearTimeout(timeout);
		// 		}
		//
		// 		function nextTimeout() {
		// 			clearTimeout(timeout);
		// 			if (mouseOver) return;
		// 			timeout = setTimeout(() => {
		// 				slider.next();
		// 			}, 1800);
		// 		}
		//
		// 		slider.on("created", () => {
		// 			slider.container.addEventListener("mouseover", () => {
		// 				mouseOver = true;
		// 				clearNextTimeout();
		// 			});
		// 			slider.container.addEventListener("mouseout", () => {
		// 				mouseOver = false;
		// 				nextTimeout();
		// 			});
		// 			nextTimeout();
		// 		});
		// 		slider.on("dragStarted", clearNextTimeout);
		// 		slider.on("animationEnded", nextTimeout);
		// 		slider.on("updated", nextTimeout);
		// 	}
		// ]
	);

	const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
		{
			// loop: true,
			mode: "free-snap",
			initial: 0,
			slides: {
				perView: 4,
				spacing: 10
			}
		},
		[ThumbnailPlugin(instanceRef)]
	);

	return (
		<>
			<div className={scss.navigation__wrapper}>
				<div ref={sliderRef} className="keen-slider">
					{images.map((item) => (
						<div key={item.id} className="keen-slider__slide">
							<div className={scss.card}>
								<Image className={scss.img} src={item.img} alt={"image"} />
							</div>
						</div>
					))}
				</div>

				{loaded && instanceRef.current && (
					<>
						<span
							className={`${scss.arrow} ${scss.arrow__left}`}
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.prev()
							}
						>
							<ArrowLeftIcon />
						</span>

						<span
							className={`${scss.arrow} ${scss.arrow__right}`}
							onClick={(e: any) =>
								e.stopPropagation() || instanceRef.current?.next()
							}
						>
							<ArrowRightIcon />
						</span>
					</>
				)}
			</div>

			<div ref={thumbnailRef} className="keen-slider thumbnail">
				{images.map((item) => (
					<div key={item.id} className="keen-slider__slide">
						<div className={scss.card}>
							<Image className={scss.img} src={item.img} alt={"image"} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};
export default Thumbnails;
