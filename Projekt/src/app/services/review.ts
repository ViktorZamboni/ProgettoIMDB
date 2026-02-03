import { Timestamp } from "firebase/firestore";

export interface Review {
  id?: string;
  mediaId: string;       
  mediaType: 'movie' | 'tv';  
  userId: string;
  username: string;
  rating: number;
  content: string;
  date: Timestamp;
}