import { Room } from "@/types";
export interface RoomActionState {
    message: string;
    room?: Room;
}
export declare function createRoomAction(initialState: RoomActionState, formData: FormData): Promise<RoomActionState>;
export declare function joinRoomAction(initialState: RoomActionState, formData: FormData): Promise<RoomActionState>;
//# sourceMappingURL=roomActions.d.ts.map