/** @format */

import SignInChoices from "@/components/SignInChoices";
import SignInForm from "@/components/SignInForm";
import React from "react";

interface SignInPageProps {
	searchParams: Promise<{
		method: string;
	}>;
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
	const { method } = await searchParams;

	return (
		<div className="w-1/3">
			<h1 className="text-3xl">SignIn</h1>
			<br />
			{method === "creds" ? <SignInForm /> : <SignInChoices page="signin" />}
		</div>
	);
};

export default SignInPage;
