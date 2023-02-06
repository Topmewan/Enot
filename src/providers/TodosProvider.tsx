import { ReactNode, useMemo, useReducer, useState } from "react";
import { Data, TodoModel, TodosContext } from "../contexts/TodosContext";

import { mockData } from "../config/constants/data";

const CHANGE_DATA = "CHANGE_DATA";

const changeDataReducer = (
	state: Data[],
	action: { type: string; payload: Data[] }
) => {
	switch (action.type) {
		case CHANGE_DATA:
			return action.payload;
		default:
			return state;
	}
};

const changeTodo = (todos: TodoModel[], todoId: string) => {
	return todos.map((todo) => {
		if (todo.id === todoId) {
			return { ...todo, complete: !todo.complete };
		}
		return todo;
	});
};
const changeData = (data: Data[], dataId: string, todoId: string) => {
	return data.map((item) => {
		if (item.id === dataId) {
			return { ...item, todos: changeTodo(item.todos, todoId) };
		}
		return item;
	});
};
export const TodosProvider = ({ children }: { children: ReactNode }) => {
	const today = new Date().toLocaleDateString();

	const sortedMock = [...mockData].sort((a, b) => {
		return +new Date(b.date) - +new Date(a.date);
	});

	const [todayTodosVisible, setTodayTodosVisible] = useState(true);
	const [data, dispatchData] = useReducer(changeDataReducer, sortedMock);

	const [todayData, setTodayData] = useState<Data | undefined>(
		data.find(({ date }) => date.toLocaleDateString() === today)
	);

	const otherData = useMemo(
		() => data.filter(({ date }) => date.toLocaleDateString() !== today),
		[data]
	);
	const onChangeData = (
		dataId: string,
		todoId: string,
		type: "today" | "other"
	) => {
		switch (type) {
			case "today":
				dispatchData({
					type: CHANGE_DATA,
					payload: changeData(data, dataId, todoId),
				});
				setTodayData((prevToday) => {
					if (!prevToday) return;
					return { ...prevToday, todos: changeTodo(prevToday.todos, todoId) };
				});
				break;
			case "other":
				dispatchData({
					type: CHANGE_DATA,
					payload: changeData(data, dataId, todoId),
				});
				break;
			default:
				break;
		}
	};

	const addTodo = ({
		date,
		title,
		description,
	}: {
		date: Date;
		title: string;
		description: string;
	}) => {
		const todo = {
			title,
			description,
			id: crypto.randomUUID(),
			complete: false,
		};

		const currentObjectWithDateFromParam = data.find(
			(item) => item.date.toLocaleDateString() === date.toLocaleDateString()
		);

		const newData = currentObjectWithDateFromParam
			? data.map((item) => {
					if (item.date.toLocaleDateString() === date.toLocaleDateString()) {
						return { ...item, todos: [...item.todos, todo] };
					}
					return item;
			  })
			: [...data, { id: crypto.randomUUID(), date: date, todos: [todo] }];

		dispatchData({
			type: "CHANGE_DATA",
			payload: newData,
		});

		setTodayData((prev) => {
			if (prev) {
				if (prev.date.toLocaleDateString() === date.toLocaleDateString()) {
					return { ...prev, todos: [...prev.todos, todo] };
				}
				return prev;
			} else {
				if (date.toLocaleDateString() === today) {
					return { id: crypto.randomUUID(), date: date, todos: [todo] };
				}
			}
		});
	};

	const onChangeTodayTodosVisible = () => {
		setTodayTodosVisible((prev) => !prev);
	};
	return (
		<TodosContext.Provider
			value={{
				data,
				todayData,
				otherData,
				onChangeData,
				todayTodosVisible,
				onChangeTodayTodosVisible,
				addTodo,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};
