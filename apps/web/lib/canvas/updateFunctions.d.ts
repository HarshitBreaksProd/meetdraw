import { Draw } from "@/types";
export declare function resizeDraw(position: "topLeft" | "topRight" | "bottomRight" | "bottomLeft" | "left" | "right" | "top" | "bottom" | `point-${number}`, x: number, y: number, selectedDraw: Draw, diagrams: Draw[], farthestPointsInfo: {
    farthestLeftPoint: {
        point: "start" | "end" | "point";
        x: number;
    };
    farthestRightPoint: {
        point: "start" | "end" | "point";
        x: number;
    };
    farthestTopPoint: {
        point: "start" | "end" | "point";
        y: number;
    };
    farthestBottomPoint: {
        point: "start" | "end" | "point";
        y: number;
    };
} | null, intialPointsForFreeHandMove?: {
    initialPoint: {
        x: number;
        y: number;
    };
    originalPoints: {
        x: number;
        y: number;
    }[];
} | null): Draw | null;
export declare function calculateFarthestPoints(selectedDraw: Draw): {
    farthestLeftPoint: {
        point: "start" | "end" | "point";
        x: number;
    };
    farthestRightPoint: {
        point: "start" | "end" | "point";
        x: number;
    };
    farthestTopPoint: {
        point: "start" | "end" | "point";
        y: number;
    };
    farthestBottomPoint: {
        point: "start" | "end" | "point";
        y: number;
    };
} | null;
export declare function moveDraw(x: number, y: number, offsetX: number, offsetY: number, selectedDraw: Draw, diagrams: Draw[], intialPointsForFreeHandMove?: {
    initialPoint: {
        x: number;
        y: number;
    };
    originalPoints: {
        x: number;
        y: number;
    }[];
} | null): Draw | null;
export declare function handleShapeSelectionBox(draw: Draw, ctx: CanvasRenderingContext2D): Draw | null;
//# sourceMappingURL=updateFunctions.d.ts.map