import axios from "axios";

const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${
	import.meta.env.VITE_API_KEY
}`;

export type ReqModel = {
	status?: string;
	totalResults?: number;
	articles?: Article[];
};

export type Article = {
	source?: Source;
	author?: string;
	title?: string;
	description?: string;
	url?: string;
	urlToImage?: string;
	publishedAt?: Date;
	content?: string;
};

export type Source = {
	id?: string;
	name?: string;
};
export const NEWS_SERVICE = {
	async getNew() {
		const { data } = await axios.get<ReqModel>(url);
		return data;
	},
};
