import { UIBox, UIDivider, UIIcon, UITypography } from "../../ui";

import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { dataDateTransform } from "../../config/helpers";
import { Data } from "../../contexts/TodosContext";
import { useTodos } from "../../hooks";
import { Todo } from "../Todo/Todo";
import styles from "./Accordion.module.css";

type AccordionProps = Data & {};
export const Accordion = ({ date, id: dataId, todos }: AccordionProps) => {
	const { onChangeData } = useTodos();
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className={styles.button}>
						<UIBox type='item'>
							<div className={styles.wrapper}>
								<UIDivider />
								<UITypography as='h3' color='white'>
									{dataDateTransform(date)}
									Task
								</UITypography>
							</div>
							<UIIcon
								iconType='arrow'
								className={classNames(styles.arrow, {
									[styles.open]: open,
								})}
							/>
						</UIBox>
					</Disclosure.Button>

					<Disclosure.Panel>
						<UIBox type='list'>
							{todos.map((todo, idx) => (
								<Todo
									key={todo.id}
									{...{ ...todo, idx }}
									onChange={() => onChangeData(dataId, todo.id, "other")}
								/>
							))}
						</UIBox>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
