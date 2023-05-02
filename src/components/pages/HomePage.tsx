import Head from "next/head";
import React, { FC } from "react";
import scss from "@/components/pages/Style.module.scss";
import KeenSlider from "@/components/keen-slider/KeenSlider";
import Weather from "@/components/weather/Weather";
import Tabs from "@/components/tabs/Tabs";

const HomePage: FC = () => {
	return (
		<>
			<Head>
				<title>Keen Slider</title>
			</Head>
			<div className={scss.home__page}>
				<div className="container">
					<div className={scss.content}>
						<a href="https://keen-slider.io/" target="_blank">
							<h1 className={scss.title}>
								Keen <span>Slider</span>👈
							</h1>
						</a>
						<div className={scss.slider}>
							<KeenSlider />
						</div>
						<Weather />
						<Tabs />
					</div>
				</div>
			</div>
		</>
	);
};
export default HomePage;
