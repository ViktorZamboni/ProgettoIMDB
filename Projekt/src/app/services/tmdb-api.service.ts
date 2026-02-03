import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWYyMjVjNjY0YzFhNTBlZWUxYTkzODBjYmVlN2IyMSIsIm5iZiI6MTc1MDM0ODUyOC42NjMsInN1YiI6IjY4NTQzMmYwMzI5ZGFlN2JhNTVkOGE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u-AjOZUAynThwtkd4cBNP0YPHwCpTROcbagl1b5du9k';



  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.tmdbApiKey)
      .set('query', query)
      .set('page', page.toString())
      .set('include_adult', 'false');

    return this.http.get(`${this.baseUrl}/search/movie`, { params });
  }

  getMovieDetails(id: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.tmdbApiKey)
      .set('append_to_response', 'credits,videos');

    return this.http.get(`${this.baseUrl}/movie/${id}`, { params });
  }

  getTopRatedMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated`, {
      headers: {
        'Authorization': this.authToken,
        'accept': 'application/json'
      },
      params: new HttpParams().set('language', 'en-US').set('page', page.toString())
    });
  }

  getPopularMovies(page: number = 1): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/popular`, {
    headers: {
      'Authorization': this.authToken,
      'accept': 'application/json'
    },
    params: new HttpParams().set('language', 'en-US').set('page', page.toString())
  });
}

  getPopularTvSeries(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/popular`, {
      headers: {
        'Authorization': this.authToken,
        'accept': 'application/json'
      },
      params: new HttpParams()
        .set('language', 'en-US')
        .set('page', page.toString())
    });
  }

  getTopRatedTvSeries(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/top_rated`, {
      headers: {
        'Authorization': this.authToken,
        'accept': 'application/json'
      },
      params: new HttpParams()
        .set('language', 'en-US')
        .set('page', page.toString())
    });
  }

  getTvDetails(id: string): Observable<any> {
  const params = new HttpParams()
    .set('api_key', environment.tmdbApiKey)
    .set('append_to_response', 'credits,videos,created_by');

  return this.http.get(`${this.baseUrl}/tv/${id}`, { params });
}
}