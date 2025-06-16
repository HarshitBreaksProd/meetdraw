import { Action, Draw } from "@/types";

const broadcastAction = (action: Action, socket: WebSocket) => {
  socket.send(
    JSON.stringify({
      type: "draw",
      content: JSON.stringify(action),
    })
  );
};

export const pushToUndoRedoArray = (
  action: Action,
  undoRedoArray: Action[],
  undoRedoIndex: number,
  socket: WebSocket
) => {
  if (undoRedoArray.length === 50) {
    undoRedoArray.shift();
  }
  if (undoRedoIndex < undoRedoArray.length - 1) {
    undoRedoArray.splice(
      undoRedoIndex + 1,
      undoRedoArray.length - 1 - undoRedoIndex
    );
  }
  undoRedoArray.push(action);
  undoRedoIndex = undoRedoArray.length - 1;

  broadcastAction(action, socket);
  return { undoRedoArray, undoRedoIndex };
};

export const performUndo = (
  undoRedoArray: Action[],
  undoRedoIndex: number,
  diagrams: Draw[],
  socket: WebSocket
): { diagrams: Draw[]; undoRedoIndex: number; undoRedoArray: Action[] } => {
  const action = undoRedoArray[undoRedoIndex];

  let undoAction: Action;

  if (undoRedoIndex < 0 || !action)
    return { diagrams, undoRedoIndex, undoRedoArray };

  switch (action.type) {
    case "create":
      diagrams = diagrams.filter(
        (diagram) => diagram.id !== action.modifiedDraw!.id
      );
      undoAction = {
        type: "erase",
        originalDraw: action.modifiedDraw,
        modifiedDraw: null,
      };
      break;
    case "move":
    case "resize":
    case "edit":
      diagrams.forEach((diagram, index) => {
        if (diagram.id === action.originalDraw!.id) {
          diagrams[index] = action.originalDraw!;
        }
      });
      undoAction = {
        type: action.type,
        originalDraw: action.modifiedDraw,
        modifiedDraw: action.originalDraw,
      };
      break;
    case "erase":
      diagrams.push(action.originalDraw!);
      undoAction = {
        type: "create",
        originalDraw: null,
        modifiedDraw: action.originalDraw,
      };
      break;
  }

  broadcastAction(undoAction, socket);

  return {
    diagrams,
    undoRedoIndex: Math.max(-1, undoRedoIndex - 1),
    undoRedoArray: undoRedoArray,
  };
};

export const performRedo = (
  undoRedoArray: Action[],
  undoRedoIndex: number,
  diagrams: Draw[],
  socket: WebSocket
): { diagrams: Draw[]; undoRedoIndex: number; undoRedoArray: Action[] } => {
  if (undoRedoIndex === undoRedoArray.length - 1) {
    return { diagrams, undoRedoIndex, undoRedoArray };
  }

  const action = undoRedoArray[undoRedoIndex + 1];

  if (!action) return { diagrams, undoRedoIndex, undoRedoArray };

  let redoAction: Action;

  switch (action.type) {
    case "create":
      diagrams.push(action.modifiedDraw!);
      redoAction = {
        type: "create",
        originalDraw: null,
        modifiedDraw: action.modifiedDraw,
      };
      break;
    case "move":
    case "resize":
    case "edit":
      diagrams.forEach((diagram, index) => {
        if (diagram.id === action.originalDraw!.id) {
          diagrams[index] = action.modifiedDraw!;
        }
      });
      redoAction = {
        type: action.type,
        originalDraw: action.originalDraw,
        modifiedDraw: action.modifiedDraw,
      };
      break;
    case "erase":
      diagrams = diagrams.filter(
        (diagram) => diagram.id !== action.originalDraw!.id
      );
      redoAction = {
        type: "erase",
        originalDraw: action.originalDraw,
        modifiedDraw: null,
      };
      break;
  }

  broadcastAction(redoAction, socket);

  return {
    diagrams,
    undoRedoIndex: Math.min(undoRedoArray.length - 1, undoRedoIndex + 1),
    undoRedoArray,
  };
};
