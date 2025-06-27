import "server-only";

// importing necessary Appwrite modules for user authentication and database operations
import { 
    Account, 
    Client,
    Databases,
    Models,
    Storage,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Storage as StorageType,
    type Users as UsersType,
} from "node-appwrite"

// "getCookie" retrieves cookies from the request, and "createMiddleware" creates a middleware
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";

// Defining the shape of the context variables
type AdditionalContext = {
	Variables: {
		account: AccountType;
		databases: DatabasesType;
		storage: StorageType;
		users: UsersType;
		user: Models.User<Models.Preferences>;
	};	
};

// checks if the user is authenticated by verifying the session cookie
// if authenticated, it sets the account, databases, storage, and user in the context 
export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

			const session = getCookie(c, AUTH_COOKIE);

			if (!session){
				return c.json({error: "Unauthorized"}, 401);
			}

			client.setSession(session);

			const account = new Account(client);
			const databases = new Databases(client);
			const storage = new Storage(client);

			const user = await account.get();

			c.set("account", account);
			c.set("databases", databases);
			c.set("storage", storage);
			c.set("user", user);

			await next();
	},
);

