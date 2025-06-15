import { Action, Draw } from "@/types";

export const pushToUndoRedoArray = (
  action: Action,
  undoRedoArray: Action[],
  undoRedoIndex: number
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

  return { undoRedoArray, undoRedoIndex };
};

export const performUndo = (
  undoRedoArray: Action[],
  undoRedoIndex: number,
  diagrams: Draw[]
): { diagrams: Draw[]; undoRedoIndex: number; undoRedoArray: Action[] } => {
  const action = undoRedoArray[undoRedoIndex];

  if (undoRedoIndex < 0 || !action)
    return { diagrams, undoRedoIndex, undoRedoArray };

  switch (action.type) {
    case "create":
      diagrams = diagrams.filter(
        (diagram) => diagram.id !== action.modifiedDraw!.id
      );
      break;
    case "move":
    case "resize":
    case "edit":
      diagrams.forEach((diagram, index) => {
        if (diagram.id === action.originalDraw!.id) {
          diagrams[index] = action.originalDraw!;
        }
      });
      break;
    case "erase":
      diagrams.push(action.originalDraw!);
      break;
  }

  return {
    diagrams,
    undoRedoIndex: Math.max(-1, undoRedoIndex - 1),
    undoRedoArray: undoRedoArray,
  };
};

export const performRedo = (
  undoRedoArray: Action[],
  undoRedoIndex: number,
  diagrams: Draw[]
): { diagrams: Draw[]; undoRedoIndex: number; undoRedoArray: Action[] } => {
  if (undoRedoIndex === undoRedoArray.length - 1) {
    return { diagrams, undoRedoIndex, undoRedoArray };
  }

  const action = undoRedoArray[undoRedoIndex + 1];

  if (!action) return { diagrams, undoRedoIndex, undoRedoArray };

  switch (action.type) {
    case "create":
      diagrams.push(action.modifiedDraw!);
      break;
    case "move":
    case "resize":
    case "edit":
      diagrams.forEach((diagram, index) => {
        if (diagram.id === action.originalDraw!.id) {
          diagrams[index] = action.modifiedDraw!;
        }
      });
      break;
    case "erase":
      diagrams = diagrams.filter(
        (diagram) => diagram.id !== action.originalDraw!.id
      );
      break;
  }

  return {
    diagrams,
    undoRedoIndex: Math.min(undoRedoArray.length - 1, undoRedoIndex + 1),
    undoRedoArray,
  };
};

const broadcastAction = (action: Action) => {
  console.log(action);
};