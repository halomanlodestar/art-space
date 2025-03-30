import { getSession } from "@/actions/session";

export default async function Home() {
  console.log(await getSession());

  return <div className={"h-page"}></div>;
}
