// My import.
import type ServerStatus from "./ServerStatus";

interface UI_State {
  notification: ServerStatus | null;
  fetchCartCompleted: boolean;
}
export default UI_State;
