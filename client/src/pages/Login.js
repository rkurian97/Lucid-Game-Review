import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Login = () => {

	//creating state for userForm data
	const [userFormData, setUserFormData] = useState({ email: '', password: '' });
	const [login, { error }] = useMutation(LOGIN_USER);

	// Watches for changes in form and changes userForm state based on Change
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	// On submit takes user form state and Uses to perform login
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log(userFormData)
			const { data } = await login({
				variables: { ...userFormData }
			});

			Auth.login(data.login.token);

			setUserFormData({
				email: '',
				password: '',
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">

				<div className="w-full xl:w-3/4 lg:w-11/12 flex">

					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590845947376-2638caa89309?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')" }}
					></div>

					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<img
							className="mx-auto h-12 w-auto"
							src="./lucid-logo.svg"
							alt="Workflow"
						/>
						<h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
						<form onSubmit={handleFormSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
									Email
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									name="email"
									type="email"
									placeholder="Email"
									onChange={handleInputChange}
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
									Password
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									name="password"
									type="password"
									placeholder="**********"
									onChange={handleInputChange}
								/>

							</div>
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-blue-900 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Sign In
								</button>
							</div>

							{
								error && <p className='text-center text-sm text-red-600 mb-2'>{error.message}</p>
							}

							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link
									className="inline-block text-sm text-red-600 align-baseline hover:text-red-700"
									to="/signup"
								>
									Create an Account!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;