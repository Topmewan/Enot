import { ForwardedRef, forwardRef } from "react";

import { Switch } from "@headlessui/react";
import { UIIcon } from "..";
import classNames from "classnames";
import styles from "./UISwitch.module.css";

type UiSwitchProps = {
	checked?: boolean | undefined;
	defaultChecked?: boolean | undefined;
	onChange?(checked: boolean): void;
	name?: string | undefined;
	value?: string | undefined;
	className?: string;
};
export const UISwitch = forwardRef(
	(
		{ checked, className, onChange, ...rest }: UiSwitchProps,
		ref: ForwardedRef<HTMLButtonElement>
	) => {
		return (
			<Switch
				as='button'
				checked={checked}
				onChange={onChange}
				ref={ref}
				className={classNames(styles.switch, className, {
					[styles.enabled]: checked,
					[styles.disabled]: !checked,
				})}
				{...rest}
			>
				<span
					aria-hidden='true'
					className={classNames(styles.thumb, {
						[styles.thumbEnabled]: checked,
					})}
				>
					{checked ? (
						<UIIcon iconType='checked' />
					) : (
						<UIIcon iconType='close' />
					)}
				</span>
			</Switch>
		);
	}
);
