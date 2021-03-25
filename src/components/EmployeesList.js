import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeService";
import { Link } from "react-router-dom";

const EmployeesList = () => {
	const [employees, setEmployees] = useState([]);
	const [currentEmployee, setCurrentEmployee] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchName, setSearchName] = useState("");

	useEffect(() => {
		retrieveEmployees();
	}, []);

	const onChangeSearchName = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	const retrieveEmployees = () => {
		EmployeeDataService.getAll()
			.then((res) => {
				setEmployees(res.data);
				console.log(res.data);
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
			.then((res) => {
				console.log(res.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByName = () => {
		EmployeeDataService.findByName(searchName)
			.then((res) => {
				setEmployees(res.data);
				console.log(res.data);
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
						placeholder="Search by name"
						value={searchName}
						onChange={onChangeSearchName}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByName}
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
								{employee.name}
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
								<strong>Name:</strong>
								{currentEmployee.name}
							</label>{" "}
						</div>
						<div>
							<label>
								<strong>empEmail:</strong>
								{currentEmployee.empEmail}
							</label>{" "}
						</div>
						<div>
							<label>
								<strong>Status:</strong>
								{currentEmployee.isActive ? "Active" : "Inactive"}
							</label>{" "}
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
