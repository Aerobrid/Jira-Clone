// to generate unique IDs for users
import { ID } from "node-appwrite";
// Importing necessary modules from Hono framework
import { Hono } from "hono";
// request validation
import { zValidator } from "@hono/zod-validator";
// (functions that set/delete cookies in HTTP responses)
import { deleteCookie, setCookie } from "hono/cookie";

// validation schemas for login and registration
import { loginSchema, registerSchema } from "../schemas";
// cookie name constant for authentication
import { AUTH_COOKIE } from "../constants";

// Importing the createAdminClient function to interact with Appwrite's account service
import { createAdminClient } from "@/lib/appwrite";
// Importing session middleware to check user sessions and attach user data to requests
import { sessionMiddleware } from "@/lib/session-middleware";

// new hono instance to handle authentication routes
const app = new Hono()
  .get(
    "/current",
    sessionMiddleware,
    (c) => {
      const user = c.get("user");

      return c.json({ data: user });
    }
  )
  .post(
    "/login",
    // Using zValidator to validate the request body against the loginSchema
    zValidator("json", loginSchema),
    async (c) => {
      // Extracting email and password from the validated request body
      const { email, password } = c.req.valid("json");

      const { account } = await createAdminClient();

      // create a session using the provided email and password
      const session = await account.createEmailPasswordSession(
        email,
        password,
      );

      // Set the session secret in a cookie for authentication
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true });
    }
  )
  // same process for registration
  .post(
    "/register",
    zValidator("json", registerSchema),
    async (c) => {
      const { name, email, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      await account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      const session = await account.createEmailPasswordSession(
        email,
        password,
      );

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true });
    }
  )
  .post("/logout", sessionMiddleware, async (c) => {
    // "sessionMiddleware" ensures user is authenticated before proceeding
    // get the account object from the context set by the middleware
    const account = c.get("account");

    // delete the authentication cookie
    // and delete the current session from Appwrite
    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  });

export default app;

