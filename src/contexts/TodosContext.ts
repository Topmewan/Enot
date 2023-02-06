import { createContext } from "react";

export type TodoModel = {
	id: string;
	complete: boolean;
	title: string;
	description: string;
};

export type Data = {
	id: string;
	date: Date;
	todos: TodoModel[];
};

export type TodosContext = {
	data: Data[];
	todayData: Data | undefined;
	otherData: Data[];
	todayTodosVisible: boolean;
	onChangeTodayTodosVisible: () => void;
	onChangeData: (
		dataId: string,
		todoId: string,
		type: "today" | "other"
	) => void;
	addTodo: ({
		date,
		title,
		description,
	}: {
		date: Date;
		title: string;
		description: string;
	}) => void;
};
export const TodosContext = createContext<TodosContext>({
	data: [],
	todayData: undefined,
	otherData: [],
	onChangeData: () => {},
	todayTodosVisible: false,
	onChangeTodayTodosVisible: () => {},
	addTodo: () => {},
});
