import React, { useState } from "react";
import EmployeeDataService from "../services/EmployeeService";

const AddEmployee = () => {
	const initialEmployeeState = {
		_id: null,
		name: "",
		empEmail: "",
		isActive: true,
	};
	const [employee, setEmployee] = useState(initialEmployeeState);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEmployee({ ...employee, [name]: value });
	};

	const saveEmployee = () => {
		var data = {
			name: employee.name,
			empEmail: employee.empEmail,
		};

		EmployeeDataService.create(data)
			.then((res) => {
				setEmployee({
					_id: res.data._id,
					name: res.data.name,
					empEmail: res.data.empEmail,
					isActive: res.data.isActive,
				});
				setSubmitted(true);
				console.log(res.data);
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
						<label htmlFor="name">Name</label>
						<input
							type="text"
							className="form-control"
							id="name"
							required
							value={employee.name}
							onChange={handleInputChange}
							name="name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="empEmail">empEmail</label>
						<input
							type="text"
							className="form-control"
							id="empEmail"
							required
							value={employee.empEmail}
							onChange={handleInputChange}
							name="empEmail"
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
