export default function historyReducer(
  state: HistoryStateType,
  action: ActionType
) {
  const {
    type,
    payload: { value, historyLine },
  } = action;
  const newState = { ...state };

  switch (type) {
    case "function": {
      switch (value) {
        case "toggleHistoryIsOpen": {
          newState.historyIsOpen = !state.historyIsOpen;
          break;
        }
        case "add": {
          if (historyLine) {
            newState.historyLines = [...state.historyLines, historyLine];
          }
          break;
        }
        case "C": {
          newState.historyLines = [];
          break;
        }
        case "back": {
          newState.historyLines = state.historyLines.slice(0, -1);
          break;
        }
        case "close": {
          newState.historyIsOpen = false;
          break;
        }
      }
      break;
    }
    case "number": {
      newState.historyIsOpen = false;
      break;
    }
  }
  return newState;
}
