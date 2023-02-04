import { DetailedHTMLProps, HTMLAttributes } from "react";

import cn from "classnames";
import styles from "./UIBox.module.css";

type UIBoxProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	type: "list" | "item";
};
export const UIBox = ({ children, type, className, ...rest }: UIBoxProps) => {
	return (
		<div className={cn(styles.wrapper, styles[type], className)} {...rest}>
			{children}
		</div>
	);
};
