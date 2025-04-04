import { postFakeProfile } from "helpers/fakebackend_helper";
import { profileFailed, profileSuccess } from "./reducer";

import { RootState } from "slices";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";

interface User {
  username: string;
  idx: number;
}

export const editProfile =
  (user: User): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      let response: any;
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        response = await postFakeProfile(user);
      } else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      }

      if (response) {
        dispatch(profileSuccess(response));
      }
    } catch (error) {
      dispatch(profileFailed(error));
    }
  };
