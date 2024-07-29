import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { format, parseISO } from 'date-fns';


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
    dislikeCount: number;
    commentsCount: number;
}

export interface NewsResponse {
    pageCount: number;
    currentPage: number;
    newsDataPage: INewsItem[];
}
export interface IComment {
    id: number;
    newsId: number;
    authorName: string;
    commentDate: string;
    comment: string;
}

export interface CommentsResponse {
    comments: IComment[];
}

export interface initialNewsState {
    newsArr: INewsItem[];
    status: null | "loading" | "success" | "error";
    selectedNews: INewsItem | null;
    pageCount: number;
    currentPage: number;
    comments: IComment[];
}
const initialState: initialNewsState = {
    newsArr: [],
    status: null,
    selectedNews: null,
    pageCount: 0,
    currentPage: 0,
    comments: [],

};

export const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy HH:mm');
};



export const fetchNews = createAsyncThunk<NewsResponse, void, { state: RootState }>(
    'news/fetchNews', async () => {
        const data = (await axios.get<NewsResponse>('/api/news?page=0')).data;
        return data;
    });
export const fetchNewsById = createAsyncThunk<INewsItem, number, { state: RootState }>(
    'news/fetchNewsById', async (id) => {
        const data = (await axios.get<INewsItem>(`/api/news/${id}`)).data;
        return data;
    }
);
export const fetchComments = createAsyncThunk<CommentsResponse, number, { state: RootState }>(
    'news/fetchComments', async (newsId, { rejectWithValue }) => {
        try {
            const data = (await axios.get<IComment[]>(`/api/news/${newsId}/comments`)).data;
            return { comments: data };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                //если ненайдено, то возвращаем 404. и присваеваем пустой массив комментариев
                return { comments: [] };
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// export const fetchRegionsBySection = createAsyncThunk<
// NewsResponse,
//     { sectionName: string; regionName: string },
//     { state: RootState }
// >(
//     'news/fetchRegionsBySection', async ({ sectionName, regionName }) => {
//         const data = (await axios.get<NewsResponse[]>(`/api/news/findBy?page=0&section=${sectionName}&region=${regionName}`)).data;
//         return data;
//     }
// );

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
                // state.newsArr = action.payload;
                // state.sections = Array.from(new Set(action.payload.map(news => news.sectionName)));

                state.newsArr = action.payload.newsDataPage;
                // state.sections = Array.from(new Set(action.payload.newsDataPage.map(news => news.sectionName)));
                state.pageCount = action.payload.pageCount;
                state.currentPage = action.payload.currentPage;
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

            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'success';
                state.comments = action.payload.comments || [];
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'error';
                console.error("Failed to fetch comments by newsID::", action.error.message);
            });
        // .addCase(fetchRegionsBySection.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(fetchRegionsBySection.fulfilled, (state, action) => {
        //     state.status = 'success';
        //     // state.newsArr = action.payload;

        //     // state.status = 'success';
        //     // const regionsMap = action.payload.reduce((acc, region) => {
        //     //     acc[region.regionId] = region.regionName;
        //     //     return acc;
        //     // }, {} as { [key: number]: string });
        //     // state.regions = regionsMap;

        //     state.newsArr = action.payload.newsDataPage; // Обновляем newsArr с данными из fetchRegionsBySection
        //     state.pageCount = action.payload.pageCount;
        //     state.currentPage = action.payload.currentPage;
        // })
        // .addCase(fetchRegionsBySection.rejected, (state, action) => {
        //     state.status = 'error';
        //     console.error("Failed to fetch news by section:", action.error.message);
        // });

    }
})

export default newsSlice.reducer;



