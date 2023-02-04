import { UIDivider, UISwitch, UITypography } from "../../ui";

import classNames from "classnames";
import { getColor } from "../../config/helpers";
import { TodoModel } from "../../contexts/TodosContext";
import styles from "./Todo.module.css";

type TodoProps = TodoModel & {
	onChange: () => void;
	idx: number;
};
export const Todo = ({
	idx,
	complete,
	onChange,
	title,
	description,
	...rest
}: TodoProps) => {
	const color = getColor(idx + 1);

	return (
		<div className={styles.todo}>
			<div className={styles.content}>
				<UIDivider bg={color} />
				<div className={styles.stack}>
					<UITypography
						as='h3'
						color='white'
						className={classNames({
							[styles.complete]: complete,
						})}
					>
						{title}
					</UITypography>
					<UITypography as='p' color='rgba(255, 255, 255, 0.6)'>
						{description}
					</UITypography>
				</div>
			</div>
			<UISwitch checked={complete} onChange={onChange} />
		</div>
	);
};
