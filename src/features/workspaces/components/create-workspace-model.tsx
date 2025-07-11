"use client";

import { ResponsiveModel } from "@/components/responsive-model";

import { CreateWorkspaceForm } from "./create-workspace-form";

import { useCreateWorkspaceModel } from "../hooks/use-create-workspace-model";

export const CreateWorkspaceModel = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModel();

  return (
    <ResponsiveModel open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModel>
  );
};
