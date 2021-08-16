import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';

import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import MovieView from './views/MovieView';
import NotFoundView from './views/NotFoundView';

import './App.css';

export default function App() {
  return (
    <>
    <AppBar />
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
    </>
  );
}
