import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TmdbApiService } from '../services/tmdb-api.service';
import { Auth, user } from '@angular/fire/auth';
import { ReviewService } from '../services/review.service';
import { Review } from '../services/review';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  reviews: Review[] = [];
  trailerUrl: SafeResourceUrl | null = null;
  loading: boolean = true;
  error: string | null = null;
  newReview: any = {
    rating: 0,
    content: '',
  };
  currentUser: any = null;
  isLoggedIn = false;
  private reviewsSubscription!: Subscription;
  private destroy$ = new Subject<void>();

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
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      this.loadMovieData(movieId);
      this.loadReviews(movieId, 'movie'); // Aggiungi tipo media
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMovieData(movieId: string): void {
    this.loading = true;
    this.error = null;
    this.movie = null;
    this.trailerUrl = null;

    this.tmdbService.getMovieDetails(movieId).subscribe({
      next: (response) => {
        this.movie = this.mapTmdbToMovie(response);

        if (response.credits) {
          this.movie.director =
            response.credits.crew.find(
              (member: any) => member.job === 'Director'
            )?.name || 'Unknown';

          this.movie.cast = response.credits.cast
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
        console.error('Error loading movie:', error);
        this.error = 'Failed to load movie details';
        this.loading = false;
      },
    });
  }

  private mapTmdbToMovie(tmdbData: any): any {
    return {
      id: tmdbData.id,
      title: tmdbData.title,
      year: tmdbData.release_date
        ? tmdbData.release_date.substring(0, 4)
        : 'N/A',
      rating: tmdbData.vote_average,
      duration: tmdbData.runtime ? `${tmdbData.runtime} min` : 'N/A',
      genres: tmdbData.genres ? tmdbData.genres.map((g: any) => g.name) : [],
      description: tmdbData.overview || 'No description available.',
      poster: tmdbData.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Poster',
      backdrop: tmdbData.backdrop_path
        ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`
        : 'https://via.placeholder.com/1280x720?text=No+Backdrop',
    };
  }

  retryLoading(): void {
    const movieId = this.route.snapshot.params['id'];
    if (movieId) {
      this.loadMovieData(movieId);
    } else {
      this.error = 'No movie ID available';
    }
  }

  loadReviews(mediaId: string, mediaType: 'movie'): void {
    this.reviewService.getReviews(mediaId, mediaType).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  submitReview(): void {
    if (this.movie) {
      const review: Review = {
        mediaId: this.movie.id,
        mediaType: 'movie',
        userId: this.currentUser.uid,
        username:
          this.currentUser.displayName ||
          this.currentUser.email?.split('@')[0] ||
          'Anonymous',
        rating: this.newReview.rating,
        content: this.newReview.content,
        date: Timestamp.now(),
      };

      this.reviewService.addReview(review).then(() => {
        this.loadReviews(this.movie.id, 'movie');
      });
    }
  }

  onRatingChange(rating: number): void {
    this.newReview.rating = rating;
  }
}
