import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthPage = () => {
  return (
    <div className={"flex justify-center items-center flex-col space-y-6"}>
      <div className={"w-full"}>
        <h1 className={"text-2xl font-bold"}>Welcome to the Auth Page</h1>
        <p className={"text-gray-600 "}>
          Please choose an authentication method.
        </p>
      </div>
      <Card className={"w-full"}>
        <CardContent className={"w-full flex flex-col gap-y-4"}>
          <Button className={"cursor-pointer"} asChild>
            <Link href={"/auth/email"}>Sign in with Email</Link>
          </Button>
          <Button className={"cursor-pointer bg-blue-500 text-white"} asChild>
            <a href={"http://localhost:8000/auth/signin/google"}>
              Sign in with Google
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
