import { createContext } from "react";
export type NewContextModel = {
	checked: boolean;
	onChange: React.Dispatch<React.SetStateAction<boolean>>;
};
export const NewsContext = createContext<NewContextModel>({
	checked: false,
	onChange: () => {},
});
