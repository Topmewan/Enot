import { createContext } from "react";

export type Todo = {
	id: string;
	complete: boolean;
	title: string;
	description: string;
};

export type Data = {
	id: string;
	date: string;
	todos: Todo[];
};

export type TodosContext = {
	data: Data[];
	todayData: Data | undefined;
	otherData: Data[];
	onChangeData: (
		dataId: string,
		todoId: string,
		type: "today" | "other"
	) => void;
};
export const TodosContext = createContext<TodosContext>({
	data: [],
	todayData: undefined,
	otherData: [],
	onChangeData: () => {},
});
