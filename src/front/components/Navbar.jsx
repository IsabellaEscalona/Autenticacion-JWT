import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const handleLogout = () => {

		dispatch({type: 'logout'})
		localStorage.clear()
		navigate('/login')

	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
				</div>
			</div>
		</nav>
	);
};