import "./index.css";

import { NewsProvider, TodosProvider } from "./providers";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { App } from "./components";
import { queryClient } from "./config/api/queryConfig";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<NewsProvider>
			<TodosProvider>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</TodosProvider>
		</NewsProvider>
	</React.StrictMode>
);
