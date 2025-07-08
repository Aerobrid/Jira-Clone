import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";

import { createWorkspaceSchema } from "../schemas";

import { MemberRole } from "@/features/members/types";

import { sessionMiddleware } from "@/lib/session-middleware";
import { generateInviteCode } from "@/lib/utils";

import { DATABASE_ID, WORKSPACES_ID, IMAGES_BUCKET_ID, APPW_ENDPOINT, APPW_PROJECT_ID, MEMBERS_ID } from "@/config";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("userId", user.$id)],
    );

    if (members.total === 0) {
      return c.json({ data: { documents: [], total: 0 } });
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [
        Query.orderDesc("$createdAt"),
        Query.contains("$id", workspaceIds)
      ],
    );

    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image } = c.req.valid("form");

      let uploadedImageUrl: string | undefined;
      let uploadedImageId: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );

        uploadedImageId = file.$id;

        // Clean up APPWRITE_ENDPOINT to avoid double /v1
        const endpoint = APPW_ENDPOINT.replace(/\/v1$/, "");

        uploadedImageUrl = `${endpoint}/v1/storage/buckets/${IMAGES_BUCKET_ID}/files/${uploadedImageId}/view?project=${APPW_PROJECT_ID}&mode=admin`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageId: uploadedImageId, 
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10),
        },
      );

      await databases.createDocument(
        DATABASE_ID,
        MEMBERS_ID,
        ID.unique(),
        {
          userId: user.$id,
          workspaceId: workspace.$id,
          role: MemberRole.ADMIN,
        },
      );

      return c.json({ data: workspace });
    }
  );    

export default app;