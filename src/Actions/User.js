import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "LoginRequest",
      });
  
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "LoginSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoginFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
      const { data } = await axios.get("/api/v1/me");
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get("/api/v1/users");
      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LogoutRequest",
      });
  
      const { data } = await axios.get(
        "/api/v1/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "LogoutSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LogoutFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const getMyDebates = () => async (dispatch) => {
    try {
      dispatch({
        type: "myPostsRequest",
      });
  
      const { data } = await axios.get(
        "/api/v1/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "myPostsSuccess",
        payload: data.debates,
      });
    } catch (error) {
      dispatch({
        type: "myPostsFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const registerUser = (name,email, password , avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
  
      const { data } = await axios.post(
        "/api/v1/register",
        { name , email , password , avatar},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };