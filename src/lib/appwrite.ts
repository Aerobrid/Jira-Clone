import "server-only";

import {
    Client,
    Account,
    Storage,
    Users,
    Databases,
} from "node-appwrite";

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