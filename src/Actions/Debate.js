import axios from "axios";

export const getAllDebates =
    (name = "") =>
        async (dispatch) => {
            try {
                dispatch({
                    type: "allDebatesRequest",
                });

                const { data } = await axios.get("/api/v1/debates");
                dispatch({
                    type: "allDebatesSuccess",
                    payload: data.debates,
                });
            } catch (error) {
                dispatch({
                    type: "allDebatesFailure",
                    payload: error.response.data.message,
                });
            }
        };

export const likeDebate = (debate_id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        });

        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1/debate/like_debate",
            {debate_id},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "likeSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        });
    }
};
export const commentDebate = (debate_id,comment) => async (dispatch) => {
    try {
        dispatch({
            type: "commentRequest",
        });

        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1/debate/comment",
            {debate_id , comment },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "commentSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "commentFailure",
            payload: error.response.data.message,
        });
    }
};
export const participateDebate = (debate_id,side) => async (dispatch) => {
    try {
        dispatch({
            type: "participateRequest",
        });

        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1/register_participant",
            {debate_id , side },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "participateSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "participateFailure",
            payload: error.response.data.message,
        });
    }
};
export const pointDebate = (debate_id,side,message) => async (dispatch) => {
    try {
        dispatch({
            type: "pointRequest",
        });

        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1//debate/keep_view",
            {debate_id , side , message},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "pointSuccess",
            payload: {
                message: data.message,    // Returned message
                messageId: data.messageId // Assuming API returns messageId
            },
        });
    } catch (error) {
        dispatch({
            type: "pointFailure",
            payload: error.response.data.message,
        });
    }
};
export const like_message = (debate_id,message_id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeMessageRequest",
        });
        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1//debate/like_message",
            {debate_id , message_id},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "likeMessageSuccess",
            payload: {
                message: data.message,    // Returned message
                messageId: data.messageId // Assuming API returns messageId
            },
        });
    } catch (error) {
        dispatch({
            type: "likeMessageFailure",
            payload: error.response.data.message,
        });
    }
};
export const createNewDebate = (title,category,image) => async (dispatch) => {
    try {
        dispatch({
            type: "newDebateRequest",
        });
        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1/debate/upload",
            {title,category,image},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "newDebateSuccess",
            payload: {
                message: data.message,    // Returned message
                // messageId: data.messageId // Assuming API returns messageId
            },
        });
    } catch (error) {
        dispatch({
            type: "newDebateFailure",
            payload: error.response.data.message,
        });
    }
};
export const finish_debate = (debateId) => async (dispatch) => {
    try {
        dispatch({
            type: "finishDebateRequest",
        });
        // const { data } = await axios.get(`/api/v1/post/${id}`);
        const { data } = await axios.post(
            "/api/v1/debate/finish",
            {debateId},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        dispatch({
            type: "finishDebateSuccess",
            payload: {
                message: data.message,    // Returned message
                // messageId: data.messageId // Assuming API returns messageId
            },
        });
    } catch (error) {
        dispatch({
            type: "finishDebateFailure",
            payload: error.response.data.message,
        });
    }
};