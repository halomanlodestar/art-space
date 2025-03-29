/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export function AuthForm() {
	return (
		<Tabs defaultValue="sign-in" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="sign-in">Sign In</TabsTrigger>
				<TabsTrigger value="sign-up">Sign Up</TabsTrigger>
			</TabsList>
			<TabsContent value="sign-in">
				<SignInForm />
			</TabsContent>
			<TabsContent value="sign-up">
				<SignUpForm />
			</TabsContent>
		</Tabs>
	);
}
