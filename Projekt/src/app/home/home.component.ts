import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { TmdbApiService } from '../services/tmdb-api.service'; // Update this import

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  description: string;
}

interface PopularMovie {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  description: string;
  startYear: number;
  averageRating: number;
  numVotes: number;
  genres: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredMovies: Movie[] = [];
  popularMovies: PopularMovie[] = [];
  isLoading = true;

  constructor(private tmdbApiService: TmdbApiService) { } // Use TmdbApiService

  ngOnInit(): void {
    this.loadTopMovies();
    this.loadPopularMovies();
  }

  loadTopMovies(): void {
    this.tmdbApiService.getTopRatedMovies().subscribe({
      next: (data: any) => {
        this.featuredMovies = data.results.slice(0, 10).map((movie: any) => ({
          id: movie.id.toString(),
          title: movie.title,
          poster: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'assets/images/default-poster.jpg',
          rating: movie.vote_average,
          year: new Date(movie.release_date).getFullYear(),
          description: movie.overview
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching top movies:', err);
        this.isLoading = false;
      }
    });
  }

  loadPopularMovies(): void {
    this.tmdbApiService.getPopularMovies().subscribe({
      next: (data: any) => {
        this.popularMovies = data.results.slice(0, 5).map((movie: any) => ({
          id: movie.id.toString(),
          primaryTitle: movie.title,
          primaryImage: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'assets/images/default-poster.jpg',
          description: movie.overview,
          startYear: new Date(movie.release_date).getFullYear(),
          averageRating: movie.vote_average,
          numVotes: movie.vote_count,
          genres: [] // Will populate later if needed
        }));
      },
      error: (err) => {
        console.error('Error fetching popular movies:', err);
      }
    });
  }
}