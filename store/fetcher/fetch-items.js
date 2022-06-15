import useSWR from 'swr';

/**
 * Fetcher function for the SWR hook.
 * Fetches data from the passed api server.
 * @param {string} uri
 * @returns {items:Object[], isLoading:boolean, isError:string | null}
 */
async function fetcher(uri) {
  const response = await fetch(uri);
  const responseData = await response.json();
  if (!response.ok) {
    // Make SWR catch the failed response.
    throw new Error(responseData.message);
  }
  return responseData;
}

export default function FetchItems(uri) {
  const { data, error } = useSWR(uri, fetcher, { revalidateOnFocus: false });

  return {
    items: data,
    isLoading: !error && !data, // There is no error and data is still being fetched.
    isError: error,
  };
}
