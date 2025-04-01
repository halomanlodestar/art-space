import { getSession } from "@/actions/session";
import HomeFeed from "@/components/HomeFeed";

export default async function Home() {
  return (
    <div className={"h-page"}>
      <HomeFeed />
    </div>
  );
}
