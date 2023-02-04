import { Popover, Transition } from "@headlessui/react";
import { UIIcon, UISwitch, UITypography } from "../../ui";

import classNames from "classnames";
import { Fragment } from "react";
import { useNews } from "../../hooks";
import styles from "./Navbar.module.css";

export const Navbar = () => {
	const { checked, onChange } = useNews();
	return (
		<header className={styles.header}>
			<UITypography as='h1' color='white'>
				To Do
			</UITypography>
			<Popover className={styles.pop}>
				{({ open }) => (
					<>
						<Popover.Button className={styles.pbutton}>
							<UIIcon iconType='gear' />
						</Popover.Button>

						<Transition
							as={Fragment}
							enter={styles.animation}
							enterFrom={styles.animationFrom}
							enterTo={styles.animationTo}
							leave={styles.animation}
							leaveFrom={styles.animationTo}
							leaveTo={styles.animationFrom}
						>
							<Popover.Panel
								className={classNames(styles.panel, {
									[styles.open]: open,
									[styles.close]: !open,
								})}
							>
								<UITypography as='h3' className={styles.title}>
									Новости
								</UITypography>
								<UITypography as='p' className={styles.text}>
									Показать/Скрыть
								</UITypography>
								<UISwitch
									checked={checked}
									onChange={onChange}
									className={styles.switch}
								/>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</header>
	);
};
