import { ReactNode, useMemo, useReducer, useState } from "react";
import { Data, Todo, TodosContext } from "../contexts/TodosContext";

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

const changeTodo = (todos: Todo[], todoId: string) => {
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
		return new Date(b.date) - new Date(a.date);
	});

	const [todayTodosVisible, setTodayTodosVisible] = useState(true);
	const [data, dispatchData] = useReducer(changeDataReducer, sortedMock);

	console.log(data);
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

	const addTodo = ({ title, description }: { [key: string]: string }) => {
		const todo = {
			title,
			description,
			id: crypto.randomUUID(),
			complete: false,
		};

		const todayObject = data.find(
			(item) => item.date.toLocaleDateString() === today
		);

		const newData = todayObject
			? data.map((item) => {
					if (item.date.toLocaleDateString() === today) {
						return { ...item, todos: [...item.todos, todo] };
					}
					return item;
			  })
			: [...data, { id: crypto.randomUUID(), date: new Date(), todos: [todo] }];

		dispatchData({
			type: "CHANGE_DATA",
			payload: newData,
		});

		setTodayData((prev) =>
			prev
				? { ...prev, todos: [...prev.todos, todo] }
				: { id: crypto.randomUUID(), date: new Date(), todos: [todo] }
		);
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
