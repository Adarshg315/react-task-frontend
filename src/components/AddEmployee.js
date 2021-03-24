import React, { useState } from "react";
import EmployeeDataService from "../services/EmployeeService";

const AddEmployee = () => {
	const initialEmployeeState = {
		_id: null,
		title: "",
		description: "",
		published: false,
	};
	const [employee, setEmployee] = useState(initialEmployeeState);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEmployee({ ...employee, [name]: value });
	};

	const saveEmployee = () => {
		var data = {
			title: employee.title,
			description: employee.description,
		};

		EmployeeDataService.create(data)
			.then((response) => {
				setEmployee({
					_id: response.data._id,
					title: response.data.title,
					description: response.data.description,
					published: response.data.published,
				});
				setSubmitted(true);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const newEmployee = () => {
		setEmployee(initialEmployeeState);
		setSubmitted(false);
	};

	return (
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className="btn btn-success" onClick={newEmployee}>
						Add
					</button>
				</div>
			) : (
				<div>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							className="form-control"
							id="title"
							required
							value={employee.title}
							onChange={handleInputChange}
							name="title"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							className="form-control"
							id="description"
							required
							value={employee.description}
							onChange={handleInputChange}
							name="description"
						/>
					</div>

					<button onClick={saveEmployee} className="btn btn-success">
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default AddEmployee;
