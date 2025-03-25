import { postFakeLogin } from "helpers/fakebackend_helper";
import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";

interface User {
  email: string;
  password: string;
}

export const loginUser =
  (
    user: User,
    history: any
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      let response: any;
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        response = await postFakeLogin({
          email: user.email,
          password: user.password,
        });

        localStorage.setItem("authUser", JSON.stringify(response));
      } else if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      }

      if (response) {
        dispatch(loginSuccess(response));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem("authUser");
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response: any;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      }

      const socialData = await response;

      if (socialData) {
        sessionStorage.setItem("authUser", JSON.stringify(socialData));
        dispatch(loginSuccess(socialData));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };
