import { Accordion, Form, Navbar, Todo } from "..";
import { useGetNews, useNews, useTodos } from "../../hooks";
import { UIBox, UICheckbox, UITypography } from "../../ui";

import axios from "axios";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getRandomItemInArray } from "../../config/helpers";
import styles from "./App.module.css";

export const App = () => {
	const { checked } = useNews();
	const { data } = useGetNews(checked);
	const {
		todayData,
		otherData,
		onChangeData,
		todayTodosVisible,
		onChangeTodayTodosVisible,
		addTodo,
	} = useTodos();

	const randomNew = data?.articles ? getRandomItemInArray(data.articles) : null;

	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://api.newscatcherapi.com/v2/search",
			params: { q: "Bitcoin", lang: "en", sort_by: "relevancy", page: "1" },
			headers: {
				"x-api-key": "Et4nwCwGUOsE64oWbc4Zs6G1CFBT95vYxLhf5L3nWEU",
			},
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Navbar />
				<UICheckbox
					checked={todayTodosVisible}
					onChange={onChangeTodayTodosVisible}
					label='Today Tasks:'
				/>

				{/* Today */}
				{todayTodosVisible ? (
					<>
						<UIBox type='list'>
							{todayData?.todos.map((todo, idx) => (
								<Todo
									key={todo.id}
									{...{ ...todo, idx }}
									onChange={() => onChangeData(todayData.id, todo.id, "today")}
								/>
							)) ?? (
								<UITypography as='h3' color='white'>
									За сегодня тудушек нет
								</UITypography>
							)}
						</UIBox>
						<Form />
					</>
				) : null}

				{/* Other */}
				<>
					{otherData.map((item) => (
						<Accordion key={item.id} {...item} />
					))}
				</>

				{/* New */}

				{randomNew && checked ? (
					<div>
						<Marquee gradient={false} className={styles.new}>
							{randomNew.title}
						</Marquee>
					</div>
				) : null}
			</div>
		</div>
	);
};
