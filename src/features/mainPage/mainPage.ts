interface Blogs {
  id: number;
  title: string;
  publishedDate: string;
  views: number;
  comments: number;
}

export interface NewsMP {
  id: number;
  regionName: string;
  sectionName: string;
  title: string;
  date: string;
  titleImageSquare: string;
  likeCount: number;
  dislikeCount: number;
  commentsCount: number;
}

interface Rent {
  id: number;
  name: string;
  price: number;
  region: string;
}

export interface MainPageData {
  blogs: Blogs[];
  innerNews: NewsMP[];
  rent: Rent[];
  sport: NewsMP[];
  world: NewsMP[];
}

export interface WeatherMP {
  city: string;
  description: string;
  humidity: string;
  ico: string;
  max: string;
  min: string;
  temp: string;
  wind: string;
}

export const month = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Juni",
  "Juli",
  "Aug",
  "Sept",
  "Okt",
  "Nov",
  "Dez",
];

export const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
