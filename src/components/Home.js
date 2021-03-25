import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeService";
// import UserService from "../services/UserService";

const Home = () => {
	// const [content, setContent] = useState("");
	const [employees, setEmployees] = useState([]);
	// const [currentIndex, setCurrentIndex] = useState(-1);
	useEffect(() => {
		retrieveEmployees();
		// UserService.getPublicContent().then(
		// 	(res) => {
		// 		setContent(res.data);
		// 	},
		// 	(error) => {
		// 		const _content =
		// 			(error.res && error.res.data) || error.message || error.toString();

		// 		setContent(_content);
		// 	}
		// );
	}, []);

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

	return (
		<div className="container">
			<header className="jumbotron">
				{/* <h3>{content}</h3> */}
				<div className="col-md-6">
					<h4>Employees List</h4>

					<ul className="list-group">
						{employees &&
							employees.map((emp) => {
								if (emp.isActive) {
									return (
										<li className={"list-group-item "}>Name: {emp.name}</li>
									);
								} else {
									// eslint-disable-next-line array-callback-return
									return;
								}
							})}
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Home;
