import { cloneElement, SVGProps } from "react";

import classNames from "classnames";
import { ReactComponent as Arrow } from "../../assets/svg/Arrow.svg";
import { ReactComponent as Checked } from "../../assets/svg/Checked.svg";
import { ReactComponent as Close } from "../../assets/svg/Close.svg";
import { ReactComponent as Gear } from "../../assets/svg/Gear.svg";
import styles from "./UIIcon.module.css";

const icons = {
	close: <Close />,
	checked: <Checked />,
	arrow: <Arrow />,
	gear: <Gear />,
};

export type UIIconProps = React.SVGProps<SVGSVGElement> & {
	iconType: "close" | "checked" | "arrow" | "gear";
};

export const UIIcon = ({
	iconType,
	className,
	...rest
}: UIIconProps): React.FunctionComponentElement<SVGProps<SVGSVGElement>> => {
	const Icon = icons[iconType];
	return cloneElement(Icon, {
		...rest,
		className: classNames(styles.icon, className),
	});
};
