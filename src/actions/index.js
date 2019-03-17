// TODO: add and export your own actions
export function createCar(body, garage, callback) {
	const request = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`, {
	 method: 'POST',
	 headers: { 'Content-Type': 'application/json' },
	 body: JSON.stringify(body)
	 })
	.then(response => response.json())
	.then(callback);
	return {
		type: "CAR_CREATED", // Not used by reducer (we navigate)
		payload: request
	};
}

export function fetchCars(garage) {
	const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`)
	.then(response => response.json());
	return {
		type: "FETCH_CARS", // Not used by reducer (we navigate)
		payload: promise
	};
}

export function fetchCar(id) {
	const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`)
	.then(response => response.json());
	return {
		type: "FETCH_CAR", // Not used by reducer (we navigate)
		payload: promise
	};
}

export function deleteCar(id, callback) {
	const request = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`, {
	 method: 'DELETE'
	 })
	.then(response => response.json())
	.then(callback)
	return {
		type: "CAR_DELETED", // Not used by reducer (we navigate)
		payload: request
	};
}
