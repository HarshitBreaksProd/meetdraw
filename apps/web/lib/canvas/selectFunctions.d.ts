import { Draw } from "@/types";
export declare const getDrawAtPosition: (x: number, y: number, diagrams: Draw[], ctx: CanvasRenderingContext2D) => Draw | null;
export declare const isWithinDraw: (mouseX: number, mouseY: number, draw: Draw, ctx: CanvasRenderingContext2D) => boolean;
export declare function hoverOverSelectionBox(selectionBox: Draw | null, x: number, y: number): {
    cursor: string;
    position: "topLeft" | "topRight" | "bottomRight" | "bottomLeft" | "left" | "right" | "top" | "bottom" | `point-${number}`;
} | null;
//# sourceMappingURL=selectFunctions.d.ts.map