import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("likeMessageRequest", (state) => {
      state.loading = true;
    })
    .addCase("likeMessageSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("likeMessageFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("commentRequest", (state) => {
      state.loading = true;
    })
    .addCase("commentSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("commentFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("newDebateRequest", (state) => {
      state.loading = true;
    })
    .addCase("newDebateSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("newDebateFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("finishDebateRequest", (state) => {
      state.loading = true;
    })
    .addCase("finishDebateSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("finishDebateFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateCaptionRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateCaptionSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateCaptionFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteDebateRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteDebateSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteDebateFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updatePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("updatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updatePasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("forgotPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("forgotPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("forgotPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("resetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("resetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("resetPasswordFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    });
});

export const myPostsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("myPostsRequest", (state) => {
      state.loading = true;
    })
    .addCase("myPostsSuccess", (state, action) => {
      state.loading = false;
      state.debates = action.payload;
    })
    .addCase("myPostsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export const pointReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("pointRequest", (state) => {
      state.loading = true;
    })
    .addCase("pointSuccess", (state, action) => {
      state.loading = false;
      state.messageId = action.payload;
    })
    .addCase("pointFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const userPostsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userPostsRequest", (state) => {
      state.loading = true;
    })
    .addCase("userPostsSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("userPostsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
