/** @format */

"use client";

import { signUp } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signUpSchema = z.object({
	username: z.string().min(3),
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
});

export function SignUpForm() {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			username: "",
		},
	});

	const { toast } = useToast();

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		try {
			await signUp(values);
			toast({
				title: "Account created",
				description: "Your account has been created successfully",
			});
		} catch (err) {
			if (err instanceof Error) {
				return toast({
					title: "Error",
					description: err.message,
				});
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
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
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Submit
				</Button>

				<FormDescription>
					Already have an account?{" "}
					<Link href="/auth/signin" className="text-blue-500">
						Sign In
					</Link>
				</FormDescription>
			</form>
		</Form>
	);
}

export default SignUpForm;
