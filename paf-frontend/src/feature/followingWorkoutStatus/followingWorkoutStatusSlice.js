import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    followingWorkoutStatuss: null,
};

export const getFollowingWorkoutStatuss = createAsyncThunk(
    "/api/v1/followingWorkoutStatus",
    async (thunkAPI) => {
        const response = await axios({
            method: "post",
            url: "/api/v1/followingWorkoutStatus",
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

export const followingWorkoutStatusSlice = createSlice({
    name: "followingWorkoutStatusSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getFollowingWorkoutStatuss.fulfilled, (state, action) => {
            state.followingWorkoutStatuss = action.payload;
        });
    },
});

export const {extraReducers} = followingWorkoutStatusSlice.actions;
export default followingWorkoutStatusSlice.reducer;
