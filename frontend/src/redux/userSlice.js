import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers:[],
    selectedUser: null,
    onlineUsers:null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setLogout: (state) => {
      state.authUser = null;
      state.otherUsers = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload;
  }
  }
});

export const { setAuthUser,setOtherUsers,setLogout,setSelectedUser,setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;