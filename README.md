# 🎬 Progetto IMDB

Applicazione web sviluppata in Angular per la ricerca e visualizzazione di informazioni su film e serie TV, utilizzando l'API di TMDB (The Movie Database).

## 📋 Descrizione

Questo progetto è un'applicazione web moderna che permette agli utenti di:
- 🔍 Cercare film e serie TV
- 📺 Visualizzare dettagli completi su film e serie TV
- ⭐ Leggere e scrivere recensioni
- 👤 Effettuare login/registrazione tramite Firebase
- 🎠 Navigare tra i contenuti tramite carousel
- 📱 Interfaccia responsive grazie a Bootstrap

## 🛠️ Tecnologie Utilizzate

- **Angular 20.0.1** - Framework frontend
- **TypeScript 5.8.3** - Linguaggio di programmazione
- **Bootstrap 5.3.3** - Framework CSS per UI responsive
- **Firebase 11.9.0** - Autenticazione e database
- **TMDB API** - Dati su film e serie TV
- **FontAwesome 6.7.2** - Icone
- **RxJS 7.8.0** - Programmazione reattiva

## 📦 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- [Node.js](https://nodejs.org/en/download/) (versione LTS consigliata)
- npm (incluso con Node.js)

## 🚀 Installazione

1. **Clona il repository**
   ```bash
   git clone <url-repository>
   cd Projekt
   ```

2. **Installa Angular CLI globalmente**
   ```bash
   npm install -g @angular/cli
   ```

3. **Installa le dipendenze del progetto**
   ```bash
   npm install
   ```

4. **Configura le variabili d'ambiente**
   - Crea/modifica i file di environment in `src/environments/`
   - Aggiungi le tue credenziali Firebase e chiave API TMDB

## 🎯 Utilizzo

### Avvio del server di sviluppo

```bash
npm start
```
oppure
```bash
ng serve
```

L'applicazione sarà disponibile su `http://localhost:4200/`

### Altri comandi utili

- **Build di produzione**
  ```bash
  npm run build
  ```

- **Build in modalità watch**
  ```bash
  npm run watch
  ```

- **Esecuzione dei test**
  ```bash
  npm test
  ```

## 📁 Struttura del Progetto

```
src/
├── app/
│   ├── aboutus/              # Pagina "Chi siamo"
│   ├── carousel/             # Componente carousel
│   ├── error/                # Pagina di errore
│   ├── footer/               # Footer del sito
│   ├── home/                 # Homepage
│   ├── login/                # Login/Registrazione
│   ├── movie-details/        # Dettagli film
│   ├── navbar/               # Barra di navigazione
│   ├── search-results/       # Risultati ricerca
│   ├── services/             # Servizi (API, Auth, Reviews)
│   ├── tv-details/           # Dettagli serie TV
│   └── tv-series/            # Lista serie TV
├── environments/             # Configurazioni ambiente
└── ...
```

## 🔧 Sviluppo

### Creare un nuovo componente

```bash
ng generate component nome-componente --standalone
```

### Creare un nuovo servizio

```bash
ng generate service services/nome-servizio
```

## 🌟 Funzionalità Principali

- **Homepage**: Visualizzazione di film e serie TV popolari in carousel
- **Ricerca**: Sistema di ricerca avanzato per film e serie TV
- **Dettagli**: Pagine dedicate con informazioni complete su ogni contenuto
- **Recensioni**: Sistema di recensioni per gli utenti registrati
- **Autenticazione**: Login e registrazione tramite Firebase
- **Responsive Design**: Interfaccia ottimizzata per tutti i dispositivi

## 👥 Autori

Progetto sviluppato per il corso WIE 2024/25

## 📄 Licenza

Questo è un progetto didattico.

## 🔗 Link Utili

- [Documentazione Angular](https://angular.dev)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs) 
