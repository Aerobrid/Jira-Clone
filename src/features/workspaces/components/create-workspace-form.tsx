import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createWorkspaceSchema } from "../schemas";

interface CreateWorkspaceFormProps {
  onCancel: () => void; 
};

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = ( values: z.infer<typeof createWorkspaceSchema> ) => {
    console.log({ values });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text">
          Create a new workspace
        </CardTitle>
      </CardHeader>
    </Card>
  )
}