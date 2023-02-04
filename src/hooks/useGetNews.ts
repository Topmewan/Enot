import { QUERY_KEYS } from "../config/api/queryKeys";
import { useQuery } from "react-query";

export const useGetNews = (allow: boolean) => {
	return useQuery({
		queryKey: QUERY_KEYS.NEWS.key,
		queryFn: QUERY_KEYS.NEWS.queryFn,
		enabled: !!allow,
	});
};
