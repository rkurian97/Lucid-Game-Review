import React from 'react'
import { Link } from "react-router-dom";

const ReviewSideMenu = () => {
    return (
        <div>
            <aside
                className="flex flex-col items-center bg-white text-gray-700 shadow h-full">

                <ul>
                    <li className="hover:bg-gray-100">
                        <Link
                            to="/addReview"
                            className="h-16 px-6 flex flex text-sm font-medium text-xl bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent transition ease-in duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-auto mb-auto ml-auto mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                        </Link>
                    </li>
                    <li className="hover:bg-gray-100">
                        <Link
                            to="/editReview"
                            className="h-16 px-6 flex flex text-sm font-medium text-xl bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent transition ease-in duration-200">
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

export default ReviewSideMenu

