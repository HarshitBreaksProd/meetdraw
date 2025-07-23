import { Action, Draw } from "@/types";
export declare const pushToUndoRedoArray: (action: Action, undoRedoArray: Action[], undoRedoIndex: number, socket: WebSocket, userId: string, roomId: string) => {
    undoRedoArray: Action[];
    undoRedoIndex: number;
};
export declare const performUndo: (undoRedoArray: Action[], undoRedoIndex: number, diagrams: Draw[], socket: WebSocket, userId: string, roomId: string) => {
    diagrams: Draw[];
    undoRedoIndex: number;
    undoRedoArray: Action[];
};
export declare const performRedo: (undoRedoArray: Action[], undoRedoIndex: number, diagrams: Draw[], socket: WebSocket, userId: string, roomId: string) => {
    diagrams: Draw[];
    undoRedoIndex: number;
    undoRedoArray: Action[];
};
export declare const performAction: (action: Action, diagrams: Draw[]) => Draw[];
//# sourceMappingURL=actionRelatedFunctions.d.ts.map