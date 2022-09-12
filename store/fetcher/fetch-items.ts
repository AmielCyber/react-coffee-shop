import useSWR from "swr";
// My import
import type Drink from "../../models/Drink";

/**
 * Fetcher function for the SWR hook.
 * Fetches data from the passed api server.
 * @param {string} uri
 * @returns {items:Object[], isLoading:boolean, isError:string | null}
 */
const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  const responseData = await response.json();
  if (!response.ok) {
    // Make SWR catch the failed response.
    throw new Error(responseData.message);
  }
  return responseData;
};

const FetchItems = <T>(uri: string, arr: T[]) => {
  const { data, error } = useSWR<T[], Error>(uri, fetcher, {
    revalidateOnFocus: false,
  });

  arr = data ? data : [];

  return {
    items: arr,
    isLoading: !error && !data, // There is no error and data is still being fetched.
    isError: error,
  };
};

export default FetchItems;
