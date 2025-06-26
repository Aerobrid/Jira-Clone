// same imports foe the registration functionality
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

// Custom hook to handle user registration
export const useRegister = () => {
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    // when called, a request is made to the register endpoint
    // the request body is passed as json
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });
      return  await response.json();
    },
  });

	return mutation;
};