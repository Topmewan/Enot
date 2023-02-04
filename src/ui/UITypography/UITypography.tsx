import { DetailedHTMLProps, HTMLAttributes } from "react";

import cn from "classnames";
import styles from "./UITypography.module.css";

type UITypographyProps<T extends React.ElementType> = {
	as?: T;
	color?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T> &
	DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const UITypography = <T extends React.ElementType = "h1">({
	as,
	color,
	children,
	className,
	...props
}: UITypographyProps<T>) => {
	const classComponentParam = String(as);
	const Component = as ?? "h1";

	return (
		<Component
			className={cn(styles.base, styles[classComponentParam], className)}
			style={{ color: color }}
			{...props}
		>
			{children}
		</Component>
	);
};
