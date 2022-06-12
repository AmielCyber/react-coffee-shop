import useSWR from 'swr';

// Fetcher for the SWR state.
async function fetcher(url) {
  const response = await fetch(url);
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
