import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import './App.css';

// import HomeView from './views/HomeView';
// import MoviesView from './views/MoviesView';
// import MovieView from './views/MovieView';
// import NotFoundView from './views/NotFoundView';

const HomeView = lazy(() => import('./views/HomeView.js' /* webpackChunkName: "HomeView"*/),);
const MoviesView = lazy(() => import('./views/MoviesView.js' /* webpackChunkName: "MoviesView"*/),);
const MovieView = lazy(() => import('./views/MovieView.js' /* webpackChunkName: "MovieView"*/),);
const NotFoundView = lazy(() => import('./views/NotFoundView.js' /* webpackChunkName: "NotFoundView"*/),);

export default function App() {
  return (
    <>
    <AppBar />

    <Suspense fallback={<h1>Loading...</h1>}>
    <Switch>
      <Route path="/" exact>
        <HomeView />
      </Route>

      <Route path="/movies" exact>
        <MoviesView />
      </Route>

      <Route path="/movies/:movieId">
        <MovieView />
      </Route>

      <Route>
        <NotFoundView />
      </Route>

    </Switch>
    </Suspense>
    </>
  );
}
