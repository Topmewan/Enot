import axios, { AxiosRequestConfig } from "axios";

export type ReqModel = {
	status?: string;
	articles?: Article[];
};

export type Article = {
	title?: string;
};

const config: AxiosRequestConfig = {
	params: { q: "Bitcoin", lang: "en", sort_by: "relevancy", page: "1" },
	headers: {
		"x-api-key": import.meta.env.VITE_API_KEY,
	},
};

export const NEWS_SERVICE = {
	async getNew() {
		const { data } = await axios.get<ReqModel>(
			import.meta.env.VITE_API_URL,
			config
		);
		return data;
	},
};
