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
    commentsCount: number
    unlikesCount: number;
    likes?: number | null;
    dislikes?: number | null;
    isUserLikes?: boolean;
    isUserDislikes?: boolean;
    likedBy?: number[];
}

export interface initialNewsState {
    newsArr: INewsItem[];
    status: null | "loading" | "success" | "error";
    selectedNews: INewsItem | null;
    sections: string[];
}
const initialState: initialNewsState = {
    newsArr: [],
    status: null,
    selectedNews: null,
    sections: [],
};
export const fetchNews = createAsyncThunk<INewsItem[], void, { state: RootState }>(
    'news/fetchNews', async () => {
        const data = (await axios.get<INewsItem[]>('/api/news')).data;
        return data;
    });
export const fetchNewsById = createAsyncThunk<INewsItem, number, { state: RootState }>(
    'news/fetchNewsById', async (id) => {
        const data = (await axios.get<INewsItem>(`/api/news/${id}`)).data;
        return data;
    }
);
export const fetchNewsBySection = createAsyncThunk<INewsItem[], string, { state: RootState }>(
    'news/fetchNewsBySection', async (sectionName) => {
        const data = (await axios.get<INewsItem[]>(`/api/news/section/${sectionName}`)).data;
        return data;
    });

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
                state.sections = Array.from(new Set(action.payload.map(news => news.sectionName)));
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

            .addCase(fetchNewsBySection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsBySection.fulfilled, (state, action) => {
                state.status = 'success';
                state.newsArr = action.payload;
            })
            .addCase(fetchNewsBySection.rejected, (state, action) => {
                state.status = 'error';
                console.error("Failed to fetch news by section:", action.error.message);
            });

    }
})

export default newsSlice.reducer;
