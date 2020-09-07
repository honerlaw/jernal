import { Action } from "redux";
import { JsonWebTokenFragment } from "../../generated/graphql";

export type SetTokenAction = {
    token: JsonWebTokenFragment | null
} & Action<'set_token'>

export function setTokenAction(token: SetTokenAction['token']): SetTokenAction {
    return {
        type: 'set_token',
        token
    }
}
