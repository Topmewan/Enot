import { useQuery } from "react-query";
import { QUERY_KEYS } from "../config/api/queryKeys";

export const useGetNews = (doReq: boolean) => {
	return useQuery({
		queryKey: QUERY_KEYS.NEWS.key,
		queryFn: QUERY_KEYS.NEWS.queryFn,
		enabled: !!doReq,
	});
};
