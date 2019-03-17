import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchCars } from '../actions';

class CarsIndex extends Component {
	componentWillMount() {
		this.props.fetchCars(this.props.garage);
	}

	renderList () {
		return (

			this.props.cars.map((car) => {
				return (
					<Link className="car-card" key={car.id} to={`/cars/${car.id}`}>
						<h1>{car.brand} {car.model}</h1>
						<h3>{car.owner} <em>{car.plate}</em></h3>
					</Link>
					);
			}));
	}

	render () {
		return (
			<div>
				<Link className="btn btn-primary btn-cta" to="/cars/new">
				 	Add a car
				 </Link>
				 <div className="Cars-list">
				   {this.renderList()}
				 </div>
			</div>
			);
	}
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({ fetchCars }, dispatch);
}

function mapStateToProps(state) {
	return {
		garage: state.garage,
		cars: state.cars
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);