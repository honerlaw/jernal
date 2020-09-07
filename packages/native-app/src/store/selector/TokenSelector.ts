import { AppState } from "../store";
import { JsonWebTokenFragment } from "../../generated/graphql";

export const TokenSelector = (state: AppState): JsonWebTokenFragment | undefined => {
    return state.token
}
