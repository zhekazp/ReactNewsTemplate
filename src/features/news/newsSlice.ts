import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';


export interface INewsItem {
    id: number;
    regionId: number;
    regionName: string;
    sectionName: string;
    title: string;
    date: string;
    titleImageSquare: string;
    titleImageWide: string;
    content: string;
    likeCount: number;
    unlikesCount: number;
    likes?: number | null;
    dislikes?: number | null;
    isUserLikes?: boolean;
    isUserDislikes?: boolean;
    likedBy?: number[];
}

export interface initialNewsState {
    newsArr: INewsItem[];
    status:null| "loading" | "success" | "error";
    selectedNews: INewsItem | null;
    idSelectedUser: number;
}
const initialState: initialNewsState = {
    newsArr: [],
    status: null,
    selectedNews: null,
    idSelectedUser: 0,
};
export const fetchNews = createAsyncThunk<INewsItem[], void, {state: RootState}>(
    'news/fetchNews', async () => {
    const data = (await axios.get<INewsItem[]>('http://localhost:8080/api/news')).data;
    return data;
});
export const fetchNewsById = createAsyncThunk<INewsItem, number, { state: RootState }>(
    'news/fetchNewsById', async (id) => {
        const data = (await axios.get<INewsItem>(`/api/news/${id}`)).data;
        return data;
    }
);


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'success';
                state.newsArr = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'error';
                console.error("Failed to fetch news:", action.error.message);
            })
            .addCase(fetchNewsById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.status = 'success';
                state.selectedNews = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.status = 'error';
                console.error("Failed to fetch news by ID:", action.error.message);
            })
            // .addCase()
            
    }
})

export default newsSlice.reducer;

// export const likeNews = createAsyncThunk('news/likeNews', async (newsId: number) => {
//     const response = await axios.post(`http://localhost:8080/news/${newsId}/like`);
//     return { newsId, data: response.data };
// });

// export const unlikeNews = createAsyncThunk('news/unlikeNews', async (newsId: number) => {
//     const response = await axios.delete(`http://localhost:8080/news/${newsId}/like`);
//     return { newsId, data: response.data };
// });

// export const dislikeNews = createAsyncThunk('news/dislikeNews', async (newsId: number) => {
//     const response = await axios.post(`http://localhost:8080/news/${newsId}/dislike`);
//     return { newsId, data: response.data };
// });

// export const undislikeNews = createAsyncThunk('news/undislikeNews', async (newsId: number) => {
//     const response = await axios.delete(`http://localhost:8080/news/${newsId}/dislike`);
//     return { newsId, data: response.data };
// });



// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "../../store";

// export interface INewsItem{
//     id: number;
//     // regionId: number;
//     // regionName: string;
//     // title: string;
//     // date: string;
//     title: string

// }

// export interface INewsItemState {
//     newsItems: INewsItem[];
//     status:null | "loading" | "success" | "error";
   
//   }
  
//   const initialState: INewsItemState = {
//     newsItems: [],
//     status: null,
    
//   };
//   export const fetchNews = createAsyncThunk<INewsItem[], void, { state: RootState }>(
//     "news/fetchNews",
//     async () => {
//       const data = (
//         await axios.get<INewsItem[]>("https://jsonplaceholder.typicode.com/users")
//       ).data;
      
      
//       return data;
//     }
//   );

//   const newsSlice = createSlice({
//     name: "news",
//     initialState,
//     reducers: {},
//     extraReducers(builder) {
//         builder
//           .addCase(fetchNews.pending, (state) => {
//             state.status = "loading";
//             console.log('loading');
//           })
//           .addCase(fetchNews.fulfilled, (state, action: PayloadAction<INewsItem[]>) => {
//               state.newsItems = action.payload;
//               state.status = "success";
             
//             }
//           )
//           .addCase(fetchNews.rejected, (state) => {
//             state.status = "error";
//           });
//       },
//   });
//   export default newsSlice.reducer;