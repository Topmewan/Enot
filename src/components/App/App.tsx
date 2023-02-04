import { useState } from "react";
import { UISwitch } from "../../ui";
import styles from "./App.module.css";
export const App = () => {
	const [e, setE] = useState(false);
	return (
		<div className={styles.wrapper}>
			<UISwitch checked={e} onChange={setE} />
		</div>
	);
};
