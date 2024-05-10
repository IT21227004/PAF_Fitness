import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingPosts: null,
};

export const getFollowingPosts = createAsyncThunk(
  "/api/v1/followingposts",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/v1/followingposts",
      headers: {
        Authorization: localStorage.getItem("psnToken"),
      },
      data: {
        id: localStorage.getItem("psnUserId"),
      },
    });
    return response.data.payload;
  }
);

async function insertComment(postId, commentContent) {
  const response = await axios({
    method: "post",
    url: "/api/v1/insertcomment",
    headers: {
      Authorization: localStorage.getItem("psnToken"),
    },
    data: {
      commentEntity: {
        userId: localStorage.getItem("psnUserId"),
        userFullname:
          localStorage.getItem("psnUserFirstName") +
          " " +
          localStorage.getItem("psnUserLastName"),
        content: commentContent,
      },
      postId: {
        id: postId,
      },
    },
  });
}

async function updateLove(postId, currentUserId) {
  const response = await axios({
    method: "post",
    url: "/api/v1/lovepost",
    headers: {
      Authorization: localStorage.getItem("psnToken"),
    },
    data: {
      id1: postId,
      id2: currentUserId,
    },
  });

  return response.data;
}

async function updateShare(postId, currentUserId) {
  const response = await axios({
    method: "post",
    url: "/api/v1/sharepost",
    headers: {
      Authorization: localStorage.getItem("psnToken"),
    },
    data: {
      id1: postId,
      id2: currentUserId,
    },
  });

  return response.data;
}

async function updatePost(postId, updatedContent) {
  const response = await axios({
    method: "put",
    url: `/api/v1/updatepost/${postId}`,
    headers: {
      Authorization: localStorage.getItem("psnToken"),
    },
    data: {
      content: updatedContent,
    },
  });

  return response.data;
}

async function deletePostRequest(postId) {
  console.log("Attempting to delete post with ID:", postId);

  try {
    const response = await axios({
      method: "delete",
      url: `/api/v1/deletepost/${postId}`,
      headers: {
        Authorization: localStorage.getItem("psnToken"),
      },
    });

    if (response.data.status === "success") {
      return postId;
    } else {
      console.error("Server response:", response.data);
      throw new Error("Post deletion failed");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export const followingPostSlice = createSlice({
  name: "followingPostSlice",
  initialState,
  reducers: {
    addLove: (state, action) => {
      if (state.followingPosts !== null) {
        for (let i = 0; i < state.followingPosts.length; i++) {
          if (state.followingPosts[i].post.id === action.payload.postId) {
            if (
              !state.followingPosts[i].post.love.includes(action.payload.userId)
            ) {
              state.followingPosts[i].post.love.push(action.payload.userId);
              updateLove(action.payload.postId, action.payload.userId);
            } else {
              state.followingPosts[i].post.love = state.followingPosts[
                i
              ].post.love.filter((item) => item !== action.payload.userId);
              updateLove(action.payload.postId, action.payload.userId);
            }
          }
        }
      }
    },

    addShare: (state, action) => {
      if (state.followingPosts !== null) {
        for (let i = 0; i < state.followingPosts.length; i++) {
          if (state.followingPosts[i].post.id === action.payload.postId) {
            state.followingPosts[i].post.share.push(action.payload.userId);
            updateShare(action.payload.postId, action.payload.userId);
          }
        }
      }
    },

    addComment: (state, action) => {
      if (state.followingPosts !== null) {
        for (let i = 0; i < state.followingPosts.length; i++) {
          if (state.followingPosts[i].post.id === action.payload.postId) {
            state.followingPosts[i].post.comment.push(
              action.payload.newComment
            );
            insertComment(
              action.payload.postId,
              action.payload.newComment.content
            );
          }
        }
      }
    },

    updatePost: (state, action) => {
      if (state.followingPosts !== null) {
        for (let i = 0; i < state.followingPosts.length; i++) {
          if (state.followingPosts[i].post.id === action.payload.postId) {
            // Update the post content in the local state
            state.followingPosts[i].post.content =
              action.payload.updatedContent;

            // Dispatch the updatePost function to update the post on the backend
            updatePost(action.payload.postId, action.payload.updatedContent)
              .then((response) => {
                if (response.status === "success") {
                  // Optionally, handle success, e.g., show a success message
                  console.log("Post updated successfully");
                } else {
                  // Optionally, handle failure, e.g., show an error message
                  console.error("Failed to update post:", response.message);
                }
              })

              .catch((error) => {
                // Optionally, handle error, e.g., show an error message
                console.error("Error updating post:", error);
              });
            break; // Exit the loop after updating the first matching post
          }
        }
      }
    },

    deletePost: (state, action) => {
      const { postId } = action.payload;

      state.followingPosts = state.followingPosts.filter(
        (post) => post.id !== postId
      );

      deletePostRequest(postId);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getFollowingPosts.fulfilled, (state, action) => {
      state.followingPosts = action.payload;
    });
  },
});

export const { addLove, addShare, addComment, deletePost } =
  followingPostSlice.actions;
export default followingPostSlice.reducer;
