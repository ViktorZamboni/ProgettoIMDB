import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TmdbApiService } from '../services/tmdb-api.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchText = '';
  searchResults: any[] = [];
  showResults = false;
  private searchSubject = new Subject<string>();
  currentUser: any = null;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private router: Router, private tmdbService: TmdbApiService, private loginService: LoginService) {
        this.loginService.auth.onAuthStateChanged(user => {
      this.currentUser = user;
      if (user) {
        this.loginService.getUserData(user.uid).then(userData => {
          this.currentUser = { ...user, displayName: userData?.displayName || user.email };
        });
      }
    });
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query.trim()) {
        this.tmdbService.searchMovies(query).subscribe(response => {
          this.searchResults = response.results.slice(0, 5);
          this.showResults = true;
        });
      } else {
        this.searchResults = [];
        this.showResults = false;
      }
    });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchText);
  }

  search() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchText }
      });
      this.searchText = '';
      this.searchResults = [];
      this.showResults = false;
    }
  }

  navigateToMovie(movieId: number) {
    this.router.navigate(['/movie', movieId]);
    this.searchText = '';
    this.searchResults = [];
    this.showResults = false;
  }

  handleFocus() {
    if (this.searchText.trim() && this.searchResults.length) {
      this.showResults = true;
    }
  }

    async logout() {
    await this.loginService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}