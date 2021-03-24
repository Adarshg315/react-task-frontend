import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeService";

const Employee = (props) => {
	const initialEmployeeState = {
		_id: null,
		title: "",
		description: "",
		published: false,
	};
	const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
	const [message, setMessage] = useState("");

	const getEmployee = (_id) => {
		EmployeeDataService.get(_id)
			.then((response) => {
				setCurrentEmployee(response.data);
				console.log(response.data);
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

	const updatePublished = (status) => {
		var data = {
			_id: currentEmployee._id,
			title: currentEmployee.title,
			description: currentEmployee.description,
			published: status,
		};

		EmployeeDataService.update(currentEmployee._id, data)
			.then((response) => {
				setCurrentEmployee({ ...currentEmployee, published: status });
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const updateEmployee = () => {
		EmployeeDataService.update(currentEmployee.id, currentEmployee)
			.then((response) => {
				console.log(response.data);
				setMessage("The employee was updated successfully!");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteEmployee = () => {
		EmployeeDataService.remove(currentEmployee._id)
			.then((response) => {
				console.log(response.data);
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
							<label htmlFor="title">Title</label>
							<input
								type="text"
								className="form-control"
								id="title"
								name="title"
								value={currentEmployee.title}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<input
								type="text"
								className="form-control"
								id="description"
								name="description"
								value={currentEmployee.description}
								onChange={handleInputChange}
							/>
						</div>

						<div className="form-group">
							<label>
								<strong>Status:</strong>
							</label>
							{currentEmployee.published ? "Published" : "Pending"}
						</div>
					</form>

					{currentEmployee.published ? (
						<button
							className="badge badge-primary mr-2"
							onClick={() => updatePublished(false)}
						>
							UnPublish
						</button>
					) : (
						<button
							className="badge badge-primary mr-2"
							onClick={() => updatePublished(true)}
						>
							Publish
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
