import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';
import carsReducer from "./reducers/cars_reducer";
import CarsIndex from "./containers/cars_index";
import CarsNew from "./containers/cars_new";
import CarsShow from "./containers/cars_show";
import '../assets/stylesheets/application.scss';

const garageName = "NikoTeslas-garage";
const initialState = {
  garage: garageName,
  cars: [
		{ id: 1, brand: 'Peugeot', model: '106', owner: 'John', plate: 'WOB-ED-42' },
		{ id: 2, brand: 'Renault', model: 'Scenic', owner: 'Paul', plate: 'AAA-12-BC' },
		{ id: 3, brand: 'Aston Martin', model: 'DB Mark III', owner: 'James', plate: '418-ED-94' },
		{ id: 4, brand: 'VW', model: 'Beetle', owner: 'George', plate: '1234-XD-75' }
		]

};

const reducers = combineReducers({
  garage: (state = initialState.garage) => state,
  cars: carsReducer,
  form: formReducer
});

// [...]


const middlewares = applyMiddleware(reduxPromise, logger);

const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CarsIndex} />
        <Route path="/cars/new" component={CarsNew} />
        <Route path="/cars/:id" component={CarsShow} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
