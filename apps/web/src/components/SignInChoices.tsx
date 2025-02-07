/** @format */

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

interface SignInChoicesProps {
	page: string;
}

const SignInChoices = ({ page }: SignInChoicesProps) => {
	return (
		<div className="flex flex-col space-y-2">
			<Button size={"lg"} asChild>
				<Link href={`/auth/${page}?method=creds`}>
					<Mail />
					Sign In with Email
				</Link>
			</Button>
			<Button size={"lg"} className="bg-blue-500">
				<FaGoogle />
				Sign In with Google
			</Button>
		</div>
	);
};

export default SignInChoices;
