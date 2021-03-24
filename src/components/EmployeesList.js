import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeService";
import { Link } from "react-router-dom";

const EmployeesList = () => {
	const [employees, setEmployees] = useState([]);
	const [currentEmployee, setCurrentEmployee] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");

	useEffect(() => {
		retrieveEmployees();
	}, []);

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const retrieveEmployees = () => {
		EmployeeDataService.getAll()
			.then((response) => {
				setEmployees(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const refreshList = () => {
		retrieveEmployees();
		setCurrentEmployee(null);
		setCurrentIndex(-1);
	};

	const setActiveEmployee = (employee, index) => {
		setCurrentEmployee(employee);
		setCurrentIndex(index);
	};

	const removeAllEmployees = () => {
		EmployeeDataService.removeAll()
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByTitle = () => {
		EmployeeDataService.findByTitle(searchTitle)
			.then((response) => {
				setEmployees(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className="list row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by title"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByTitle}
						>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<h4>Employees List</h4>

				<ul className="list-group">
					{employees &&
						employees.map((employee, index) => (
							<li
								className={
									"list-group-item " + (index === currentIndex ? "active" : "")
								}
								onClick={() => setActiveEmployee(employee, index)}
								key={index}
							>
								{employee.title}
							</li>
						))}
				</ul>

				<button
					className="m-3 btn btn-sm btn-danger"
					onClick={removeAllEmployees}
				>
					Remove All
				</button>
			</div>
			<div className="col-md-6">
				{currentEmployee ? (
					<div>
						<h4>Employee</h4>
						<div>
							<label>
								<strong>Title:</strong>
							</label>{" "}
							{currentEmployee.title}
						</div>
						<div>
							<label>
								<strong>Description:</strong>
							</label>{" "}
							{currentEmployee.description}
						</div>
						<div>
							<label>
								<strong>Status:</strong>
							</label>{" "}
							{currentEmployee.published ? "Published" : "Pending"}
						</div>

						<Link
							to={"/employees/" + currentEmployee._id}
							className="badge badge-warning"
						>
							Edit
						</Link>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a Employee...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default EmployeesList;
