import { ChangeEvent, useRef } from "react";

import styles from "./Form.module.css";
import { useTodos } from "../../hooks";

export const Form = () => {
	const { addTodo } = useTodos();
	const refT = useRef<HTMLInputElement>(null);
	const refD = useRef<HTMLInputElement>(null);

	const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!refT?.current?.value || !refD?.current?.value) {
			return;
		}
		const todoData = {
			title: refT.current.value,
			description: refD.current.value,
		};

		addTodo(todoData);
		refT.current.value = "";
		refD.current.value = "";
	};
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<input type='text' ref={refT} placeholder='Название' name='title' />
			<input type='text' ref={refD} placeholder='Описание' name='description' />
			<button type='submit'>Сохранить тудушку</button>
		</form>
	);
};
