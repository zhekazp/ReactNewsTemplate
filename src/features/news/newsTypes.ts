
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
    isPublishedByCurrentUser: boolean;

}
export interface INewsItemFullPage extends INewsItem{
    isPublishedByCurrentUser: boolean;
    content: string;
    comments: IComment[];
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
    isPublishedByCurrentUser?: boolean;
}
export interface ReactionPayload {
    newsId: number;
    liked: boolean;
    disliked: boolean;
}
export interface CommentsResponse {
    comments: IComment[];
}
export interface INewsCommentRequest {
    comment: string;
    newsId: number;
  }
export interface initialNewsState {
    newsArr: INewsItem[];
    newsStk: INewsItemFullPage | null;
    status: 'idle' | "loading" | "success" | "error";
    selectedNews: INewsItem | null;
    pageCount: number;
    error: string | null;
    message: string | null;
    currentPage: number;
    comments: IComment[];
    sections: string[];
    regions: string[];
}

export interface IRegionsResponse {
    id: number,
    regionName: string
}
export interface ISectionResponse {
    id: number,
    sectionName: string
}
export interface AddCommentResponse {
    message: string;
    comment?: IComment;
}

export interface AddCommentError {
    message: string;
}