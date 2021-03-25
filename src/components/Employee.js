import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeService";

const Employee = (props) => {
	const initialEmployeeState = {
		_id: null,
		name: "",
		empEmail: "",
		isActive: true,
	};
	const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
	const [message, setMessage] = useState("");

	const getEmployee = (_id) => {
		EmployeeDataService.get(_id)
			.then((res) => {
				setCurrentEmployee(res.data);
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getEmployee(props.match.params.id);
	}, [props.match.params.id]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCurrentEmployee({ ...currentEmployee, [name]: value });
	};

	const updateIsActive = (status) => {
		var data = {
			_id: currentEmployee._id,
			name: currentEmployee.name,
			empEmail: currentEmployee.empEmail,
			isActive: status,
		};

		EmployeeDataService.update(currentEmployee._id, data)
			.then((res) => {
				setCurrentEmployee({ ...currentEmployee, isActive: status });
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const updateEmployee = () => {
		EmployeeDataService.update(currentEmployee._id, currentEmployee)
			.then((res) => {
				console.log(res.data);
				setMessage("The employee was updated successfully!");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteEmployee = () => {
		EmployeeDataService.remove(currentEmployee._id)
			.then((res) => {
				console.log(res.data);
				props.history.push("/employees");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div>
			{currentEmployee ? (
				<div className="edit-form">
					<h4>Employee</h4>
					<form>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={currentEmployee.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="empEmail">empEmail</label>
							<input
								type="text"
								className="form-control"
								id="empEmail"
								name="empEmail"
								value={currentEmployee.empEmail}
								onChange={handleInputChange}
							/>
						</div>

						<div className="form-group">
							<label>
								<strong>Status:</strong>
							</label>
							{currentEmployee.isActive ? "Active" : "Inactive"}
						</div>
					</form>

					{currentEmployee.isActive ? (
						<button
							className="badge badge-primary mr-2"
							onClick={() => updateIsActive(false)}
						>
							DeActivate
						</button>
					) : (
						<button
							className="badge badge-primary mr-2"
							onClick={() => updateIsActive(true)}
						>
							Activate
						</button>
					)}

					<button className="badge badge-danger mr-2" onClick={deleteEmployee}>
						Delete
					</button>

					<button
						type="submit"
						className="badge badge-success"
						onClick={updateEmployee}
					>
						Update
					</button>
					<p>{message}</p>
				</div>
			) : (
				<div>
					<br />
					<p>Please click on a Employee...</p>
				</div>
			)}
		</div>
	);
};

export default Employee;
