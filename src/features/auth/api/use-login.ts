// useMutation hook for user login
// we can use this hook since we wrapped the app with the QueryProvider in layout.tsx
import { useMutation } from "@tanstack/react-query";
// hono helpers to figure out request and response types for login API call
import { InferRequestType, InferResponseType } from "hono";

// to make API calls, we import the client from our RPC library
import { client } from "@/lib/rpc";

// Define types for the response and request of the login API call which is a POST request
type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

// Custom hook to handle user login
export const useLogin = () => {
  // useMutation helps run server-side mutations and manage their state
  // <> tells TS what types to expect for the response, error, and request
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    // The mutation function that will be called when the mutation is triggered
    mutationFn: async ({ json }) => {
      // takes json data from the request and makes a POST request to the login endpoint
      const response = await client.api.auth.login["$post"]({ json });
      // returns the parsed JSON response from the API
      return  await response.json();
    },
  });

	return mutation;
};