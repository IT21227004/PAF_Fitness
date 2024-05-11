import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingWorkoutPlans: null,
};

export const getFollowingWorkoutPlans = createAsyncThunk(
  "/api/v1/followingWorkoutPlan",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/v1/followingWorkoutPlan",
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

export const editWorkoutPlan = createAsyncThunk(
  "workoutPlan/edit",
  async ({ workoutPlanID, updatedWorkoutPlan }, { rejectWithValue }) => {
    try {
      console.log("Workout Plan ID in Action Creator:", workoutPlanID);
      console.log("Updated Workout Plan:", updatedWorkoutPlan);

      const response = await axios.put(
        `/api/v1/editWorkoutPlan/${workoutPlanID}`,
        updatedWorkoutPlan,
        {
          headers: {
            Authorization: localStorage.getItem("psnToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteWorkoutPlan = createAsyncThunk(
  "workoutPlan/deleteWorkoutPlan",
  async ({ workoutPlanID }, { rejectWithValue }) => {
    console.log("Attempting to delete post with ID:", workoutPlanID);

    try {
      const response = await axios.delete(
        `/api/v1/deleteWorkoutPlan/${workoutPlanID}`,
        {
          headers: {
            Authorization: localStorage.getItem("psnToken"),
          },
        }
      );
      return response.data.payload;
    } catch (error) {
      console.error("Error deleting workout plan:", error);
      return rejectWithValue("Failed to delete workout plan");
    }
  }
);

export const followingWorkoutPlanSlice = createSlice({
  name: "followingWorkoutPlanSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getFollowingWorkoutPlans.fulfilled, (state, action) => {
        state.followingWorkoutPlans = action.payload;
      })
      .addCase(editWorkoutPlan.fulfilled, (state, action) => {
        // Handle edit success if needed
      })
      .addCase(editWorkoutPlan.rejected, (state, action) => {
        // Handle edit failure if needed
      })
      .addCase(deleteWorkoutPlan.rejected, (state, action) => {
        console.error("Error deleting workout plan:", action.error.message);
      });
  },
});

export const { extraReducers } = followingWorkoutPlanSlice.actions;
export default followingWorkoutPlanSlice.reducer;
