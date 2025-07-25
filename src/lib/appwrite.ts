import "server-only";

import { cookies } from "next/headers";

import {
    Client,
    Account,
    Storage,
    Users,
    Databases,
} from "node-appwrite";

import { AUTH_COOKIE } from "@/features/auth/constants";

export async function createSessionClient(){
 	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

	const session = await cookies().get(AUTH_COOKIE);

	if (!session || !session.value) {
		throw new Error("Unauthorized");
	}

	client.setSession(session.value);

	return{
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		}
	};
};

// Function to create an Appwrite client for admin operations, connected to the Appwrite server
export async function createAdminClient() {
	const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
		.setKey(process.env.NEXT_APPWRITE_KEY!);

	return{
		get account() {
			return new Account(client);
		},
	};
};