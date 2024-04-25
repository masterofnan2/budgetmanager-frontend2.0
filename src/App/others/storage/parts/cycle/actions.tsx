import { Cycle } from "../../../constants/dataTypes";
import { SETCYCLE } from "./actionTypes";

export const setCycle = (cycle: Cycle) => ({
    type: SETCYCLE,
    payload: cycle
});