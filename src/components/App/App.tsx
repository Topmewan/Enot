import { useGetNews, useNews, useTodos } from "../../hooks";
import { UIBox, UICheckbox, UITypography } from "../../ui";

import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { getRandomItemInArray } from "../../config/helpers";
import Accordion from "../Accordion";
import Navbar from "../Navbar";
import { Todo } from "../Todo/Todo";
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

	const refT = useRef<HTMLInputElement>(null);
	const refD = useRef<HTMLInputElement>(null);
	const add = () => {
		if (!refT?.current?.value || !refD?.current?.value) {
			return;
		}
		const obj = {
			title: refT.current.value,
			description: refD.current.value,
		};

		addTodo(obj);
		refT.current.value = "";
		refD.current.value = "";
	};

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
						<input type='text' ref={refT} />
						<input type='text' ref={refD} />
						<button onClick={add}>Сохранить</button>
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
					<Marquee gradient={false} style={{ color: "white" }}>
						{randomNew.title}
					</Marquee>
				) : null}
			</div>
		</div>
	);
};
