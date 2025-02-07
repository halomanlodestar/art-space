/** @format */

import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex items-center w-full h-[100dvh] justify-center">
			{children}
		</div>
	);
};

export default AuthLayout;
