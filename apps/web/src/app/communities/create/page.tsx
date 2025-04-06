"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateCommunitySchema,
  createCommunitySchema,
} from "@/schemas/create-community";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { getSession } from "@/actions/session";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CreateCommunityPage = () => {
  const [accessToken, setAccessToken] = useState("");

  const form = useForm<CreateCommunitySchema>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      bannerImage: "",
    },
  });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setAccessToken(session.accessToken!);
      }
    };

    fetchSession().then();
  }, []);

  const { mutate } = useMutation<unknown, unknown, CreateCommunitySchema>({
    mutationKey: ["community"],
    mutationFn: async (data) => {
      await api.communities.createCommunity(accessToken, data);
    },
    onSuccess: () => {
      toast.success("Community created successfully.");
    },
    onError: () => {
      toast.error("Failed to create community.");
    },
  });

  const onSubmit = async (data: CreateCommunitySchema) => {
    mutate(data);
  };

  return (
    <Card className={"w-full max-w-2xl"}>
      <CardHeader>
        <CardTitle>Create Community</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Community Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Community Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Profile</FormLabel>
                  <FormControl>
                    <Input type={"file"} placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bannerImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Banner</FormLabel>
                  <FormControl>
                    <Input type={"file"} placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardAction>
              <Button type="submit">Submit</Button>
            </CardAction>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCommunityPage;
