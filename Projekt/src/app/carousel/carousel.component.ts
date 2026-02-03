import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Movie {
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
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnChanges {
  @Input() movies: any[] = [];
  isLoading = true;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && this.movies.length > 0) {
      this.isLoading = false;
    }
  }

  showDetails(id: string, isTvSeries: boolean = false): void {
    if (isTvSeries) {
      this.router.navigate(['/tv', id]);
    } else {
      this.router.navigate(['/movie', id]);
    }
  }
  
  // Helper function to truncate long text
  truncateText(text: string, maxLength: number = 250): string {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  
}