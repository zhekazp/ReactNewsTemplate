import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUserAuth {
    useRole: boolean;
    authorized: boolean;
}
export interface INewsTop{
  news:string;
  url:string;
}

export interface ITopData {
  currentPage: number;  
  news: INewsTop[];
    user:IUserAuth;
}



const initialState: ITopData = {
  news: [],
  currentPage:0,
  user:{
  authorized: false,
  useRole: false}
};

export const topSlice = createSlice({
  name: "topData",
  initialState,
  reducers: {
    setNews(state, action:PayloadAction<INewsTop[]>) {
      state.news =  action.payload;
    },
    setUserData(state, action: PayloadAction<IUserAuth>){
        state.user.authorized = action.payload.authorized;
        state.user.useRole = action.payload.useRole;
    },
    setCurrentPage(state, action: PayloadAction<number>){
      state.currentPage = action.payload;
   }
  },
  
});

export default topSlice.reducer