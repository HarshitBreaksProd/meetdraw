import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Room, User } from "@/types";
declare const MainPage: ({ jwtCookie, rooms, userInfo, }: {
    jwtCookie: RequestCookie;
    rooms: Room[];
    userInfo: User;
}) => import("react").JSX.Element;
export default MainPage;
//# sourceMappingURL=MainPage.d.ts.map