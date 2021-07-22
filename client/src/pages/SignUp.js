import React, {useState} from "react";
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Home = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(userFormData)
            const { data } = await addUser({
                variables: { ...userFormData },
            });
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">

                <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="./lucid-logo.svg"
                            alt="FWorkflow"
                        />
                        <h3 className="pt-4 text-2xl text-center">Welcome!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    name='username'
                                    placeholder="Username"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name='email'
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name='password'
                                    type="password"
                                    placeholder="**********"
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                        </form>
                    </div>


                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-r-lg"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614294149010-950b698f72c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29udHJvbGxlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Home;