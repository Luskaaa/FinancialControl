import type { MascotState } from "@/src/mascot/states/mascotStates";

export interface MascotInternalState {
  state: MascotState;
  previous: MascotState;
  visible: boolean;
  lastChange: number;
}

export type MascotAction =
  | { type: "SET_STATE"; payload: MascotState }
  | { type: "SHOW" }
  | { type: "HIDE" }
  | { type: "RESET" };

export const initialMascotState: MascotInternalState = {
  state: "idle",
  previous: "idle",
  visible: true,
  lastChange: 0,
};

export function mascotReducer(
  state: MascotInternalState,
  action: MascotAction,
): MascotInternalState {
  switch (action.type) {
    case "SET_STATE": {
      if (action.payload === state.state) return state;
      return {
        ...state,
        previous: state.state,
        state: action.payload,
        lastChange: Date.now(),
      };
    }
    case "SHOW":
      return state.visible ? state : { ...state, visible: true };
    case "HIDE":
      return state.visible ? { ...state, visible: false } : state;
    case "RESET":
      return { ...initialMascotState, lastChange: Date.now() };
    default:
      return state;
  }
}
