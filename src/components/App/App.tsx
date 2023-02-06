import { Accordion, Form, Navbar, Todo } from "..";
import { useGetNews, useNews, useTodos } from "../../hooks";
import { UIBox, UICheckbox, UITypography } from "../../ui";

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
	} = useTodos();

	const randomNew = data?.articles ? getRandomItemInArray(data.articles) : null;

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
					</>
				) : null}
				<Form />

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
