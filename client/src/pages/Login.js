import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from "../utils/auth";

const Login = () => {
	const [userFormData, setUserFormData] = useState({ email: '', password: '' });

	const [login] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log(userFormData)
			const { data } = await login({
				variables: { ...userFormData }
			});
			console.log(data);
			Auth.login(data.login.token);
			this.props.history.push("/")
		} catch (err) {
			console.error(err);
		}

		setUserFormData({
			email: '',
			password: '',
		});
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
									className="w-full px-4 py-2 font-bold text-white bg-blue-800 rounded-full hover:bg-blue-900 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Sign In
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<a
									className="inline-block text-sm text-red-600 align-baseline hover:text-red-700"
									href="./register.html"
								>
									Create an Account!
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;