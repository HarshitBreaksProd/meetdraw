import { Draw } from "@/types";
export declare const renderDraws: (ctx: CanvasRenderingContext2D, canvasCurrent: HTMLCanvasElement, diagrams: Draw[], activeDraw: Draw | null, selectionBox: Draw | null, activeAction: "select" | "move" | "draw" | "resize" | "edit" | "erase" | "pan" | "zoom", selectedDraw: Draw | null, toErase: Draw[], panOffset: {
    x: number;
    y: number;
}, scale: number) => void;
//# sourceMappingURL=drawFunctions.d.ts.map