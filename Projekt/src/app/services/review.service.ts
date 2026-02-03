import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc,
  query, 
  where,
  onSnapshot,
  DocumentReference,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Review } from './review';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private firestore: Firestore = inject(Firestore);

  addReview(review: Review): Promise<DocumentReference> {
    const reviewsCollection = collection(this.firestore, 'reviews');
    return addDoc(reviewsCollection, review);
  }

  getReviews(mediaId: string, mediaType: 'movie' | 'tv'): Observable<Review[]> {
    return new Observable<Review[]>(subscriber => {
      const reviewsCollection = collection(this.firestore, 'reviews');
      const q = query(
        reviewsCollection,
        where('mediaId', '==', mediaId),
        where('mediaType', '==', mediaType),
        orderBy('date', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const reviews: Review[] = [];
        querySnapshot.forEach(doc => {
          reviews.push({ id: doc.id, ...doc.data() } as Review);
        });
        subscriber.next(reviews);
      });
      
      return () => unsubscribe();
    });
  }

addTvReview(review: Review): Promise<DocumentReference> {
  const reviewsCollection = collection(this.firestore, 'reviews');
  return addDoc(reviewsCollection, review);
}
  }