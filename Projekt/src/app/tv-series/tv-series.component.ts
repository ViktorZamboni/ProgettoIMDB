// tv-series.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbApiService } from '../services/tmdb-api.service';

interface TvSeries {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  description: string;
}

interface PopularTvSeries {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  description: string;
  startYear: number;
  averageRating: number;
  numVotes: number;
}

@Component({
  selector: 'app-tv-series',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css']
})
export class TvSeriesComponent implements OnInit {
  featuredSeries: TvSeries[] = [];
  popularSeries: PopularTvSeries[] = [];
  isLoading = true;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.loadTopSeries();
    this.loadPopularSeries();
  }

  loadTopSeries(): void {
    this.tmdbApiService.getTopRatedTvSeries().subscribe({
      next: (data: any) => {
        this.featuredSeries = data.results.slice(0, 20).map((series: any) => ({
          id: series.id.toString(),
          title: series.name,
          poster: series.poster_path 
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}` 
            : 'assets/images/default-poster.jpg',
          rating: series.vote_average,
          year: new Date(series.first_air_date).getFullYear(),
          description: series.overview
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching top series:', err);
        this.isLoading = false;
      }
    });
  }

  loadPopularSeries(): void {
    this.tmdbApiService.getPopularTvSeries().subscribe({
      next: (data: any) => {
        this.popularSeries = data.results.slice(0, 5).map((series: any) => ({
          id: series.id.toString(),
          primaryTitle: series.name,
          primaryImage: series.poster_path 
            ? `https://image.tmdb.org/t/p/w500${series.poster_path}` 
            : 'assets/images/default-poster.jpg',
          description: series.overview,
          startYear: new Date(series.first_air_date).getFullYear(),
          averageRating: series.vote_average,
          numVotes: series.vote_count
        }));
      },
      error: (err) => {
        console.error('Error fetching popular series:', err);
      }
    });
  }
}