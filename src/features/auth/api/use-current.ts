// import useQuery hook from react-query to automatically fetch and cache data
import { useQuery } from "@tanstack/react-query";

// Importing the client from the RPC library to make API calls
import { client } from "@/lib/rpc";

// exporting custom hook useCurrent 
// This hook is used to fetch the current authenticated user's data with ease
export const useCurrent = () => {
    // use useQuery to manage fetching, caching, and updating the current user data
    const query = useQuery({
        // pass in a unique key for the query describing the data being fetched
        queryKey: ["current"],
        // function to actually fetch the data, this function is called when the query is executed
        queryFn: async () => {
            // make get request to the API endpoint to fetch current user data
            const response = await client.api.auth.current.$get();

            // if the response is not ok, return null
            if (!response.ok) {
                return null;
            }

            // parse the JSON response to get the current user data
            const { data } = await response.json();

            return data;
        },
    });

    return query;
};