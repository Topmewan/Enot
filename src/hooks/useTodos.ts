import { useContext } from "react";
import { TodosContext } from "../contexts";
export const useTodos = () => useContext(TodosContext);
