import React from "react";
import styles from "./UIDivider.module.css";
type UIDividerProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	bg?: string;
};
export const UIDivider = ({ bg = "#A9A9A9", ...props }: UIDividerProps) => {
	return (
		<div
			style={{ backgroundColor: `${bg}` }}
			className={styles.divider}
			{...props}
		/>
	);
};
