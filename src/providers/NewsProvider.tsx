import React, { useState } from "react";

import { NewsContext } from "../contexts";

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
	const [checked, setChecked] = useState<boolean>(true);

	const v = {
		checked: checked,
		onChange: setChecked,
	};

	return <NewsContext.Provider value={v}>{children}</NewsContext.Provider>;
};
