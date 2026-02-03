import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  // This will be replaced with actual movie data from your backend
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.performSearch();
    });
  }

  performSearch() {
    // This is a placeholder. Replace with actual API call to your backend
    this.searchResults = [
      {
        id: 1,
        title: 'Sample Movie 1',
        poster: 'assets/sample-movie-1.jpg',
        year: 2024,
        rating: 4.5
      },
      {
        id: 2,
        title: 'Sample Movie 2',
        poster: 'assets/sample-movie-2.jpg',
        year: 2023,
        rating: 4.0
      }
    ];
  }
}
