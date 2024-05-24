"use client";

export const setAccessToken = (token: string | undefined) => {
  try {
    if (typeof window !== "undefined") {
      if (token) window.localStorage?.setItem("accesstk", token);
    }
  } catch (e) {
    // saving error
  }
};
export const getAccessToken = () => {
  try {
    if (typeof window !== "undefined") {
      const value = window.localStorage?.getItem("accesstk");
      if (value !== null) {
        return value;
      }
    }

    return "";
  } catch (e) {
    // error reading value
  }
};
export const clearAccessToken = () => {
  if (typeof window !== "undefined")
    window.localStorage?.removeItem("accesstk");
};

export const setRefreshToken = (token: string | undefined) => {
  try {
    if (typeof window !== "undefined") {
      if (token) window.localStorage?.setItem("refreshtk", token);
    }
  } catch (e) {
    // saving error
  }
};
export const getRefreshToken = () => {
  try {
    if (typeof window !== "undefined") {
      const value = window.localStorage?.getItem("refreshtk");
      if (value !== null) {
        return value;
      }
    }

    return "";
  } catch (e) {
    // error reading value
  }
};
export const clearRefreshToken = async () => {
  if (typeof window !== "undefined")
    window.localStorage?.removeItem("refreshtk");
};
