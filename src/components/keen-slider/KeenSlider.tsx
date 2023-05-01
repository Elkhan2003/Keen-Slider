import React, { FC, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import scss from "./KeenSlider.module.scss";
import Image from "next/image";
import pic1 from "@/components/keen-slider/img/anime1.jpg";
import pic2 from "@/components/keen-slider/img/anime2.jpg";
import pic3 from "@/components/keen-slider/img/anime3.jpg";
import pic4 from "@/components/keen-slider/img/anime4.jpg";
import pic5 from "@/components/keen-slider/img/anime5.jpg";
import pic6 from "@/components/keen-slider/img/anime6.jpg";
import pic7 from "@/components/keen-slider/img/anime7.jpg";
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

const KeenSlider: FC = () => {
	const [currentSlide, setCurrentSlide] = useState<any>(0);
	const [loaded, setLoaded] = useState<any>(false);
	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			// ! slider
			loop: true,
			mode: "free-snap",
			slides: {
				perView: 1
			},
			breakpoints: {
				"(min-width: 650px)": {
					slides: { perView: 2, spacing: 15 }
				},
				"(min-width: 1000px)": {
					slides: { perView: 3, spacing: 25 }
				}
			},

			// ! navigation + buttons
			initial: 0,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			}
		},

		// ! auto play
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;

				function clearNextTimeout() {
					clearTimeout(timeout);
				}

				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 1800);
				}

				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			}
		]
	);

	return (
		<>
			<div className={scss.navigation__wrapper}>
				<div ref={ref} className="keen-slider">
					{images.map((item) => (
						<div key={item.id} className="keen-slider__slide">
							<Image className={scss.img} src={item.img} alt={"anime"} />
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

			{loaded && instanceRef.current && (
				<div className={scss.dots}>
					{Array.from(
						{ length: instanceRef.current.track.details.slides.length },
						(_, idx) => (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={
									currentSlide === idx
										? `${scss.dot} ${scss.active}`
										: `${scss.dot}`
								}
							></button>
						)
					)}
				</div>
			)}
		</>
	);
};
export default KeenSlider;
