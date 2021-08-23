import React from 'react'
import { Link } from "react-router-dom";

const SocialSideMenu = () => {
    return (
        <div>
            <aside
                className="flex flex-col items-center bg-white text-gray-700 shadow h-full">

                <ul>
                    <li className="hover:bg-gray-100">
                        <Link
                            to="/addFriends"
                            className="h-16 px-6 flex flex text-sm font-medium text-xl bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent transition ease-in duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-auto mb-auto ml-auto mr-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                        </Link>
                    </li>

                    <li className="hover:bg-gray-100">
                        <Link
                            to="/friendposts"
                            className="h-16 px-6 flex flex text-sm font-medium text-xl bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent transition ease-in duration-200 self-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-auto mb-auto ml-auto mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>

                        </Link>
                    </li>

                </ul>
            </aside>

        </div>
    )
}

export default SocialSideMenu