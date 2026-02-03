import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TmdbApiService } from '../services/tmdb-api.service';
import { Auth, user } from '@angular/fire/auth';
import { ReviewService } from '../services/review.service';
import { Review } from '../services/review';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tv-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {
  tvShow: any = null;
  reviews: Review[] = [];
  trailerUrl: SafeResourceUrl | null = null;
  loading: boolean = true;
  error: string | null = null;
  newReview: any = {
    rating: 0,
    content: ''
  };
  currentUser: any = null;
  isLoggedIn = false;
  private reviewsSubscription!: Subscription;
  private destroy$ = new Subject<void>();
  private firestore: Firestore = inject(Firestore); // Fix injection context

  constructor(
    public route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private tmdbService: TmdbApiService,
    private auth: Auth,
    private reviewService: ReviewService
  ) {
    user(auth).subscribe((user) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const tvId = params['id'];
      this.loadTvData(tvId);
      this.loadReviews(tvId, 'tv'); 
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTvData(tvId: string): void {
    this.loading = true;
    this.error = null;
    this.tvShow = null;
    this.trailerUrl = null;

    this.tmdbService.getTvDetails(tvId).subscribe({
      next: (response) => {
        this.tvShow = this.mapTmdbToTv(response);
        
        if (response.credits) {
          this.tvShow.creator = response.created_by
            ? response.created_by.map((creator: any) => creator.name).join(', ')
            : 'Unknown';
          
          this.tvShow.cast = response.credits.cast
            .slice(0, 5)
            .map((actor: any) => actor.name)
            .join(', ');
        }

        if (response.videos && response.videos.results) {
          const trailer = response.videos.results.find(
            (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          
          if (trailer) {
            this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${trailer.key}`
            );
          }
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading TV show:', error);
        this.error = 'Failed to load TV show details';
        this.loading = false;
      }
    });
  }

  private mapTmdbToTv(tmdbData: any): any {
    return {
      id: tmdbData.id,
      title: tmdbData.name,
      year: tmdbData.first_air_date ? tmdbData.first_air_date.substring(0, 4) : 'N/A',
      rating: tmdbData.vote_average,
      seasons: tmdbData.number_of_seasons,
      episodes: tmdbData.number_of_episodes,
      genres: tmdbData.genres ? tmdbData.genres.map((g: any) => g.name) : [],
      description: tmdbData.overview || 'No description available.',
      poster: tmdbData.poster_path 
        ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` 
        : 'https://via.placeholder.com/300x450?text=No+Poster',
      backdrop: tmdbData.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}` 
        : 'https://via.placeholder.com/1280x720?text=No+Backdrop',
      status: tmdbData.status,
      lastAirDate: tmdbData.last_air_date,
      networks: tmdbData.networks ? tmdbData.networks.map((n: any) => n.name).join(', ') : 'N/A'
    };
  }

  retryLoading(): void {
    const tvId = this.route.snapshot.params['id'];
    if (tvId) {
      this.loadTvData(tvId);
    } else {
      this.error = 'No TV show ID available';
    }
  }

  loadReviews(mediaId: string, mediaType: 'tv'): void {
    this.reviewService.getReviews(mediaId, mediaType).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

    submitReview(): void {
    if (this.tvShow && this.newReview.content && this.newReview.rating > 0) {
      const review: Review = {
        mediaId: this.tvShow.id,    
        mediaType: 'tv',            
        userId: this.currentUser.uid,
        username: this.currentUser.displayName || 'Anonymous',
        rating: this.newReview.rating,
        content: this.newReview.content,
        date: Timestamp.now()
      };

      this.reviewService.addReview(review).then(() => {
        this.loadReviews(this.tvShow.id, 'tv');
        this.newReview = { rating: 0, content: '' };
      });
    }
  }

  onRatingChange(rating: number): void {
    this.newReview.rating = rating;
  }
}