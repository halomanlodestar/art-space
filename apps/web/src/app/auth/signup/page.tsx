/** @format */

import SignInChoices from "@/components/SignInChoices";
import SignUpForm from "@/components/SignUpForm";
import React from "react";

interface SignUpPageProps {
	searchParams: Promise<{
		method: string;
	}>;
}

const SignUpPage = async (props: SignUpPageProps) => {
	const { method } = await props.searchParams;

	return (
		<div className="w-1/3">
			<h1 className="text-3xl">SignUp</h1>
			<br />
			{method === "creds" ? <SignUpForm /> : <SignInChoices page="signup" />}
		</div>
	);
};

export default SignUpPage;
