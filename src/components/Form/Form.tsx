import { SubmitHandler, useForm } from "react-hook-form";

import { useTodos } from "../../hooks";
import styles from "./Form.module.css";

type FormValues = {
	date: string;
	title: string;
	description: string;
};

const initialFormVals = {
	date: "",
	title: "",
	description: "",
};

export const Form = () => {
	const { addTodo } = useTodos();

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<FormValues>({
		defaultValues: initialFormVals,
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (Object.values(data).some((v) => !v)) {
			return alert("Заполните все поля");
		}
		const newData = {
			...data,
			date: new Date(data.date),
		};
		addTodo(newData);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<input type='date' {...register("date")} />
			<input type='text' placeholder='Название' {...register("title")} />
			<input type='text' placeholder='Описание' {...register("description")} />
			<button type='submit' disabled={isSubmitting}>
				Сохранить тудушку
			</button>
		</form>
	);
};
