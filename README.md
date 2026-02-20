# 🎬 IMDB Project

Web application developed in Angular for searching and displaying information about movies and TV series, using the TMDB (The Movie Database) API.

## 📋 Description

This project is a modern web application that allows users to:
- 🔍 Search for movies and TV series
- 📺 View complete details about movies and TV series
- ⭐ Read and write reviews
- 👤 Login/Register via Firebase
- 🎠 Browse content through carousels
- 📱 Responsive interface thanks to Bootstrap

## 🛠️ Technologies Used

- **Angular 20.0.1** - Frontend framework
- **TypeScript 5.8.3** - Programming language
- **Bootstrap 5.3.3** - CSS framework for responsive UI
- **Firebase 11.9.0** - Authentication and database
- **TMDB API** - Movie and TV series data
- **FontAwesome 6.7.2** - Icons
- **RxJS 7.8.0** - Reactive programming

## 📦 Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
- npm (included with Node.js)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Projekt
   ```

2. **Install Angular CLI globally**
   ```bash
   npm install -g @angular/cli
   ```

3. **Install project dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   - Create/edit environment files in `src/environments/`
   - Add your Firebase credentials and TMDB API key

## 🎯 Usage

### Start development server

```bash
npm start
```
or
```bash
ng serve
```

The application will be available at `http://localhost:4200/`

### Other useful commands

- **Production build**
  ```bash
  npm run build
  ```

- **Build in watch mode**
  ```bash
  npm run watch
  ```

- **Run tests**
  ```bash
  npm test
  ```

## 📁 Project Structure

```
src/
├── app/
│   ├── aboutus/              # About us page
│   ├── carousel/             # Carousel component
│   ├── error/                # Error page
│   ├── footer/               # Site footer
│   ├── home/                 # Homepage
│   ├── login/                # Login/Registration
│   ├── movie-details/        # Movie details
│   ├── navbar/               # Navigation bar
│   ├── search-results/       # Search results
│   ├── services/             # Services (API, Auth, Reviews)
│   ├── tv-details/           # TV series details
│   └── tv-series/            # TV series list
├── environments/             # Environment configurations
└── ...
```

## 🔧 Development

### Create a new component

```bash
ng generate component component-name --standalone
```

### Create a new service

```bash
ng generate service services/service-name
```

## 🌟 Main Features

- **Homepage**: Display of popular movies and TV series in carousels
- **Search**: Advanced search system for movies and TV series
- **Details**: Dedicated pages with complete information about each content
- **Reviews**: Review system for registered users
- **Authentication**: Login and registration via Firebase
- **Responsive Design**: Interface optimized for all devices

## 👥 Authors

Project developed for the WIE 2024/25 course

## 📄 License

This is an educational project.

## 🔗 Useful Links

- [Angular Documentation](https://angular.dev)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs) 
