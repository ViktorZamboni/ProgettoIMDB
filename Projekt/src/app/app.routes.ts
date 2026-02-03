import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'tv-series', component: TvSeriesComponent },
  { path: 'tv-series/:id', component: TvDetailsComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];
