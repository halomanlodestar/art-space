/** @format */
import { getSession } from "@/actions/session";
import { client } from "@art-space/openapi/client";

export default async function Home() {
  const { accessToken } = await getSession();
  console.log("accessToken", accessToken);
  try {
    const me = await client.auth.getCurrentUser({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(me.data);
  } catch (e) {
    console.log(e);
  }

  return <h1>Home</h1>;
}
