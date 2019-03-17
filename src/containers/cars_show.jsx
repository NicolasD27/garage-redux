import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchCar, deleteCar } from "../actions";

class CarsShow extends Component {
	componentDidMount() {
		if (!this.props.car) {
		 	this.props.fetchCar(this.props.match.params.id);
		 }
	}

	handleClick = () => {
		console.log(this.props.car.id)
		this.props.deleteCar(this.props.car.id, (car) => {
			this.props.history.push('/'); // Navigate after submit
			return car;
		});

	}


	// , (car) => {
	// 			this.props.history.push('/'); // Navigate after submit
	// 			return car;
	// 			}
	render () {
		if (!this.props.car) {
		 return <p>Loading...</p>;
		 }
		return (
			<div>
				<h1>{this.props.car.brand} {this.props.car.model}</h1>
				<h3>{this.props.car.owner} <em>{this.props.car.plate}</em></h3>
				<button onClick={this.handleClick}>Delete this car</button>
				<Link className="btn btn-primary btn-cta" to="/">
				 	Back to list
				 </Link>
			</div>
			);
	}
}

function mapDispatchToProps(dispatch) {
 	return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

function mapStateToProps(state, ownProps) {
	const idFromUrl = parseInt(ownProps.match.params.id, 10);
	return {
		garage: state.garage,
		car: state.cars.find(p => p.id === idFromUrl)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);