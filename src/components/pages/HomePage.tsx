import Head from "next/head";
import React, { FC } from "react";
import scss from "@/components/pages/Style.module.scss";
import FreeSnapMod from "@/components/keen-slider/free-span-mod/FreeSnapMod";
import Weather from "@/components/weather/Weather";
import Tabs from "@/components/tabs/Tabs";
import Thumbnails from "@/components/keen-slider/thumbnails/Thumbnails";

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
						<Tabs />
						<div className={scss.slider}>
							<h1>FreeSnapMod</h1>
							<FreeSnapMod />
							<h1>Thumbnails</h1>
							<Thumbnails />
						</div>
						{/*<Weather />*/}
					</div>
				</div>
			</div>
		</>
	);
};
export default HomePage;
