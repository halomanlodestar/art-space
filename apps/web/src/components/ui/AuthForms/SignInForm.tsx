/** @format */
"use client";
import React, { startTransition, useActionState, useTransition } from "react";
import { Button } from "../button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../card";
import { Input } from "../input";
import { signInSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../form";
import { signIn } from "@/actions/auth";
import { Loader2 } from "lucide-react";

const SignInForm = () => {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Good to See you Again!</CardTitle>
				<CardDescription>Please enter your credentials</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit()} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={isPending} type="submit">
							{isPending && <Loader2 className="animate-spin" />}
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default SignInForm;
