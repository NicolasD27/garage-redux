import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createCar } from '../actions';

const validate = (values) => {
    const errors = {};
    if (!values.brand) {
      errors.brand = 'Required';
    }
    if (!values.model) {
      errors.model = 'Required';
    }
    if (!values.owner) {
      errors.owner = 'Required';
    }
    if (!values.plate) {
      errors.plate = 'Required';
    } else if (values.plate.toUpperCase() !== values.plate) {
    	errors.plate = "All caps";
    }
    return errors;
};

class CarsNew extends Component {
	onSubmit = (values) => {
			this.props.createCar(values, this.props.garage, (car) => {
			this.props.history.push('/'); // Navigate after submit
			return car;
			});
		}

	renderField({ input, label, type, meta: { touched, error, warning } }) {
	 return (
	 <div className="form-group">
	 <label className="control-label">{label}</label>
	 <input
	 className="form-control"
	 type={type}
	 {...input}
	 />
	 {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
	 </div>
	 );
	 }


	render () {
		return (
				 <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field
						className="form-control"
						 label="Brand"
						 name="brand"
						 component={this.renderField}
					/>
					<Field
						 className="form-control"
						 label="Model"
						 name="model"
						 component={this.renderField}
					/>
					<Field
						 className="form-control"
						 label="Owner"
						 name="owner"
						 component={this.renderField}
					/>
					<Field
						 className="form-control"
						 label="Plate"
						 name="plate"
						 component={this.renderField}
					/>
					<button
						className="btn btn-primary"
						type="submit"
						disabled={this.props.pristine || this.props.submitting || this.props.invalid}
					>
						Create Car
					</button>
				 </form>
			);
	}
}
function mapStateToProps(state) {
	return {
		garage: state.garage
	};
}


export default reduxForm({ form: 'newCarForm', validate })(
 connect(mapStateToProps, { createCar })(CarsNew)
);