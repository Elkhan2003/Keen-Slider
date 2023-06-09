import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import scss from "./Tabs.module.scss";
import {
	CalendarIcon,
	CertificateIcon,
	FeedBackIcon,
	PhotoIcon,
	StaffIcon,
	VideoIcon
} from "@/components/svgs";
import TabFeedBack from "@/components/tabs/tab__pages/TabFeedBack";
import TabCalendar from "@/components/tabs/tab__pages/TabCalendar";
import TabStaff from "@/components/tabs/tab__pages/TabStaff";
import TabPhoto from "@/components/tabs/tab__pages/TabPhoto";
import TabVideo from "@/components/tabs/tab__pages/TabVideo";
import TabСertificate from "@/components/tabs/tab__pages/TabСertificate";

interface tabsProps {
	id: number;
	icon: any;
	label: any;
	page?: any;
}

const tabs: tabsProps[] = [
	{
		id: 1,
		icon: <FeedBackIcon />,
		label: "feedback",
		page: <TabFeedBack />
	},
	{
		id: 2,
		icon: <CalendarIcon />,
		label: "schedule",
		page: <TabCalendar />
	},
	{
		id: 3,
		icon: <StaffIcon />,
		label: "employees",
		page: <TabStaff />
	},
	{
		id: 4,
		icon: <PhotoIcon />,
		label: "photo",
		page: <TabPhoto />
	},
	{
		id: 5,
		icon: <VideoIcon />,
		label: "video",
		page: <TabVideo />
	},
	{
		id: 6,
		icon: <CertificateIcon />,
		label: "certificate",
		page: <TabСertificate />
	}
];

const Tabs: FC = () => {
	const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

	return (
		<>
			<div className={scss.tabs__container}>
				<div className={scss.content}>
					<h1 className={scss.about__us}>Что мы такое?</h1>
					<div className={scss.tabs}>
						<div className={scss.buttons}>
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => {
										setActiveTab(tab.id);
									}}
									className={
										activeTab === tab.id
											? `${scss.button} ${scss.active}`
											: `${scss.button}`
									}
								>
									{activeTab === tab.id && (
										<motion.div
											layoutId="active-pill"
											className={scss.active}
											style={{
												borderRadius: 12
											}}
											transition={{ type: "spring", duration: 0.6 }}
										/>
									)}
									<span className={scss.icon}>{tab.icon}</span>
									<span className={scss.label}>{tab.label}</span>
								</button>
							))}
						</div>
						<div className={scss.pages}>
							{tabs.map((tab) =>
								activeTab === tab.id ? (
									<div key={tab.id} className={scss.tabs__content}>
										{tab.page}
									</div>
								) : null
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Tabs;
