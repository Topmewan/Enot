import { NEWS_SERVICE } from "./services";

export const QUERY_KEYS = {
	NEWS: {
		key: ["news"],
		queryFn: NEWS_SERVICE.getNew,
	},
};
