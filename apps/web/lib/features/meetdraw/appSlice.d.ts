import { User, Room } from "@/types";
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "app/setUser">, setRooms: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "app/setRooms">, setHomeView: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "app/setHomeView">, setActiveRoom: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "app/setActiveRoom">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"app/logout">, setBackgroundHaloPosition: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "app/setBackgroundHaloPosition">;
declare const _default: import("@reduxjs/toolkit").Reducer<{
    user: User | null;
    rooms: Room[] | null;
    homeView: "meetdraws" | "create-room" | "join-room" | "chat";
    activeRoom: Room | null;
    backgroundHaloPosition: {
        x: string;
        y: string;
    } | null;
}>;
export default _default;
//# sourceMappingURL=appSlice.d.ts.map