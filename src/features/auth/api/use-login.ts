// useMutation hook for user login
// we can use this hook since we wrapped the app with the QueryProvider in layout.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
// hono helpers to figure out request and response types for login API call
import { InferRequestType, InferResponseType } from "hono";

// to make API calls, we import the client from our RPC library
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

// Define types for the response and request of the login API call which is a POST request
type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

// Custom hook to handle user login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // useMutation helps run server-side mutations and manage their state
  // <> tells TS what types to expect for the response, error, and request
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    // when called, a request is made to the login endpoint
    mutationFn: async ({ json }) => {
      // takes json data from the request and makes a POST request to the login endpoint
      const response = await client.api.auth.login["$post"]({ json });
      // returns the parsed JSON response from the API
      return  await response.json();
    },
    onSuccess: () => {
      // on successful login refresh the page
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    }
  });
  // Return the mutation object with properties like isLoading, error, and mutate
	return mutation;
};