export interface Draw {
  id: string;
  shape:
    | "rectangle"
    | "diamond"
    | "circle"
    | "line"
    | "arrow"
    | "text"
    | "freeHand";
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
  font?: string;
  fontSize?: string;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  text?: string;
  points?: { x: number; y: number }[];
}

export interface Action {
  type: "create" | "move" | "resize" | "erase" | "edit";
  originalDraw: Draw | null;
  modifiedDraw: Draw | null;
}
