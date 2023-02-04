import { ChangeEvent, useEffect, useState } from "react";

import UIIcon from "../UIIcon";
import UITypography from "../UITypography";
import styles from "./UICheckbox.module.css";

type UICheckboxProps = {
	checked: boolean;
	onChange: (v: boolean) => void;
	label: string;
};
export const UICheckbox = ({ checked, onChange, label }: UICheckboxProps) => {
	const [innerChecked, setInnerChecked] = useState(checked);

	useEffect(() => {
		onChange(innerChecked);
	}, [innerChecked]);

	const handleKeyboard = (e: React.KeyboardEvent) => {
		if (e.code === "Space" || e.code === "Enter") {
			e.preventDefault();
			setInnerChecked((prev) => !prev);
		}
	};

	const hanldeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInnerChecked(e.target.checked);
	};

	return (
		<label className={styles.wrapper} tabIndex={0} onKeyDown={handleKeyboard}>
			<input type='checkbox' checked={innerChecked} onChange={hanldeChange} />
			<span className={styles.custom}>
				{checked ? <UIIcon iconType='checked' /> : null}
			</span>
			<UITypography as='h3' color='white'>
				{label}
			</UITypography>
		</label>
	);
};
