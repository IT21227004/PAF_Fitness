import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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

export const followingWorkoutPlanSlice = createSlice({
    name: "followingWorkoutPlanSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getFollowingWorkoutPlans.fulfilled, (state, action) => {
            state.followingWorkoutPlans = action.payload;
        });
    },
});

export const {extraReducers} = followingWorkoutPlanSlice.actions;
export default followingWorkoutPlanSlice.reducer;
