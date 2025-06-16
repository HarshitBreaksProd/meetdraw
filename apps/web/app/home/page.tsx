import MainPage from "@/components/home/MainPage";
import { redirect } from "next/navigation";

import { fetchAllRoomsAction } from "@/actions/roomActions";
import { getUserInfoAction } from "@/actions/contentActions";
import { getAuthSession } from "@/lib/auth";

const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/signin");
  }

  try {
    const [userInfo, rooms] = await Promise.all([
      getUserInfoAction(),
      fetchAllRoomsAction(),
    ]);

    return <MainPage user={userInfo.user} rooms={rooms} />;
  } catch (error) {
    console.error("Failed to load home page data:", error);
    redirect("/signin");
  }
};

export default page;
