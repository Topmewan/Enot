import { useGetNews, useNews } from "../../hooks";

import Marquee from "react-fast-marquee";
import { getRandomItemInArray } from "../../config/helpers";
import Navbar from "../Navbar";
import styles from "./App.module.css";

export const App = () => {
	const { checked } = useNews();
	const { data } = useGetNews(checked);

	const randomNew = data?.articles ? getRandomItemInArray(data.articles) : null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Navbar />
				{randomNew && checked ? (
					<Marquee gradient={false} style={{ color: "white" }}>
						{randomNew.title}
					</Marquee>
				) : null}
			</div>
		</div>
	);
};
