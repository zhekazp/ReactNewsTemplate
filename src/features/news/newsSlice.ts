import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
<<<<<<< HEAD


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
=======
import { format, parseISO } from 'date-fns';
import { AddCommentResponse, CommentsResponse, IComment, INewsCommentRequest, INewsItem, INewsItemFullPage, initialNewsState, IRegionsResponse, ISectionResponse, NewsResponse, ReactionPayload, ReactionResponse } from './newsTypes';
import authorizedFetch from '../blog/blogs/authorizedFetch';
// import authorizedFetch from './authorizedFetch';

const initialState: initialNewsState = {
    newsArr: [],
    newsStk: null,
    status: 'idle',
    selectedNews: null,
    pageCount: 0,
    error: null,
    currentPage: 0,
    comments: [] as IComment[],
    message: null,
    sections: [],
    regions: [],
};

export const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy HH:mm');
};



export const fetchNews = createAsyncThunk<NewsResponse, { page: number }, { state: RootState }>(
    'news/fetchNews', async ({ page }) => {
        try {
            const data = (await axios.get<NewsResponse>(`/api/news?page=${page}`)).data;
            return data;
        } catch (error) {
            throw error;
        }
    });
export const fetchNewsById = createAsyncThunk<INewsItem, number, { state: RootState }>(
    'news/fetchNewsById', async (id: number, { rejectWithValue }) => {
        try {
            const storedToken = localStorage.getItem("token");
            let token = "";
            if (storedToken) {
                token = `Bearer ${storedToken}`;
            }
            const response = await axios.get<INewsItem>(`/api/news/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            console.log("Full API response:", response);
            console.log("Blog data:", response.data);
            console.log(
                "isPublishedByCurrentUser:",
                response.data.isPublishedByCurrentUser
            );
            return response.data;
        } catch (error) {
            console.error("Error in fetchBlogById:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const fetchPutReaction = createAsyncThunk<ReactionResponse, ReactionPayload, { state: RootState }>(
    'news/fetchPutReaction', async (payload, { rejectWithValue, dispatch }) => {
        try {
            const { newsId, liked, disliked } = payload;
            const response = await authorizedFetch(`/api/news/reaction`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newsId, liked, disliked }),
            });

            if (!response.ok) {
                throw new Error('Failed to send reaction');
            }
            //  return response;
            const responseData = await response.json();
            await dispatch(fetchNewsById(newsId));
            return responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const fetchComments = createAsyncThunk<CommentsResponse, number, { state: RootState }>(
    'news/fetchComments', async (newsId, { rejectWithValue }) => {
        try {
            const storedToken = localStorage.getItem("token");
            let token = "";
            if (storedToken) {
                token = `Bearer ${storedToken}`;
            }
            const response = await axios.get<IComment[]>(`/api/news/${newsId}/comments`,
                {
                    headers: {
                        Authorization: token,
                    },
                });
            console.log("Full API response from Comments:", response);
            console.log("Blog data from Comments:", response.data);
            response.data.forEach(comment => {
                console.log("Comment ID:", comment.id, "isPublishedByCurrentUser:", comment.isPublishedByCurrentUser);
            });

            if (response.status === 204 || !response.data || response.data.length === 0) {

                return { comments: [] };
            }
            return { comments: response.data };
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
export const fetchSections = createAsyncThunk<ISectionResponse[], void, { state: RootState }>(
    'news/fetchSections',
    async () => {
        try {
            const data = (await axios.get<ISectionResponse[]>('/api/sections')).data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const fetchRegions = createAsyncThunk<IRegionsResponse[], void, { state: RootState }>(
    'news/fetchRegions',
    async () => {
        try {
            const data = (await axios.get<IRegionsResponse[]>('/api/regions')).data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
// export const addComment = createAsyncThunk<
//   { message: string; comment?: IComment },
//   INewsCommentRequest,
//   { rejectValue: { message: string } }
// >(
//   'news/addComment',
//   async (commentData, { rejectWithValue }) => {
//     try {
//       const response = await authorizedFetch(`/api/news/comment`, {
//         method: 'POST',
//         body: JSON.stringify(commentData),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         return rejectWithValue({ message: data.message || 'Failed to add comment' });
//       }
//       return data;
//     } catch (error: any) {
//       return rejectWithValue({ message: error.message });
//     }
//   }
// );
export const addComment = createAsyncThunk<AddCommentResponse, INewsCommentRequest, { state: RootState }>(
    'news/addComment',
    async (commentData: INewsCommentRequest, { rejectWithValue, dispatch }) => {
        try {
            console.log('Sending to API:', commentData);
            const response = await authorizedFetch(`/api/news/comment`, {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to add comment');
            }
            const responseData = await response.json();
            await dispatch(fetchComments(commentData.newsId));
            return responseData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchFilteredNews = createAsyncThunk<NewsResponse, { page: number; section?: string; region?: string }, { state: RootState }>(
    'news/fetchFilteredNews',
    async ({ page, section = '', region = '' }) => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                section,
                region
            });

            const response = await axios.get<NewsResponse>(`/api/news/findBy?${params.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const editComment = createAsyncThunk<IComment, { id: number, comment: string, newsId: number }, { state: RootState }>(
    'news/editComment', async ({ id, comment, newsId }, { rejectWithValue }) => {
        try {
            const response = await authorizedFetch(`/api/news/comment`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment, id, newsId }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to edit comment');
            }
            const responseData = await response.json();
            return responseData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (commentId: number, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`/api/news/comment`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: commentId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return commentId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
// export const deleteComment = createAsyncThunk<void, { commentId: number }, { state: RootState }>(
//     'news/deleteComment', async ({ commentId }, { rejectWithValue }) => {
//         // await axios.delete(`/api/news/comment`, { data: { commentId } });
//         // return { commentId };
//         try {
//             const response = await authorizedFetch(`/api/news/comment`, {
//                 method: 'DELETE',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ commentId }),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete comment');
//             }
//             return {commentId};
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );
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
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db

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
<<<<<<< HEAD
                state.newsArr = action.payload;
                state.sections = Array.from(new Set(action.payload.map(news => news.sectionName)));
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'error';
=======
                // state.newsArr = action.payload;
                // state.sections = Array.from(new Set(action.payload.map(news => news.sectionName)));

                state.newsArr = action.payload.newsDataPage;
                const sectionsSet = new Set<string>();
                const regionsSet = new Set<string>();

                action.payload.newsDataPage.forEach(news => {
                    sectionsSet.add(news.sectionName);
                    regionsSet.add(news.regionName);
                });


                state.pageCount = action.payload.pageCount;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || null;
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
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
<<<<<<< HEAD
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
=======
                state.error = action.error.message || null;
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
                state.error = action.error.message || null;
                console.error("Failed to fetch comments by newsID::", action.error.message);
            })
            .addCase(fetchPutReaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPutReaction.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload.message;
            })
            .addCase(fetchPutReaction.rejected, (state, action) => {
                state.status = 'error';
                console.error('Failed to put reaction:', action.error.message);
            })
            .addCase(fetchFilteredNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredNews.fulfilled, (state, action) => {
                state.status = 'success';
                state.newsArr = action.payload.newsDataPage;
                state.pageCount = action.payload.pageCount;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchFilteredNews.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || null;
                console.error("Failed to fetch filtered news:", action.error.message);
            })
            .addCase(fetchRegions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegions.fulfilled, (state, action) => {
                state.regions = action.payload.map(region => region.regionName);
                state.status = 'success';
            })
            .addCase(fetchRegions.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || null;
                console.error("Failed to fetch regions:", action.error.message);
            })
            .addCase(fetchSections.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSections.fulfilled, (state, action) => {
                state.sections = action.payload.map(section => section.sectionName);
                state.status = 'success';
            })
            .addCase(fetchSections.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || null;
                console.error("Failed to fetch sections:", action.error.message);
            })
            .addCase(editComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(addComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = 'Comment added successfully';

                // if (state.newsStk) {
                //     state.newsStk.comments.unshift(action.payload as unknown as IComment);
                // }

                // state.comments.unshift(action.payload.comment as IComment);
                const newComment = action.payload.comment;
                if (newComment) {
                    state.comments.unshift(newComment); // Убедитесь, что newComment не undefined
                }

            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string || 'An error occurred';
            })
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db

    }
})

export default newsSlice.reducer;
<<<<<<< HEAD
=======



>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
