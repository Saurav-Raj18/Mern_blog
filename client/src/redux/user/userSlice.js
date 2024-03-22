import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:null,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
            state.error = null
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
           state.loading = false;
           state.error =action.payload;
        },
        updateStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading = false;
        },
        deleteUserStart:(state)=>{
           // state.currentUser=null;
            state.loading=false;
            state.error=null;
        }
        ,
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        }
    }
})

export const {signInFailure, signInSuccess,signInStart,updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserSuccess,deleteUserStart}=userSlice.actions;
export default userSlice.reducer;