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
                            to="/editReview"
                            className="h-16 px-6 flex flex justify-center items-center w-full focus:text-orange-500">
                            Posts
                        </Link>
                    </li>

                    <li className="hover:bg-gray-100">
                        <Link
                            to="/addReview"
                            className="h-16 px-6 flex flex justify-center items-center w-full focus:text-orange-500">
                            Add

                        </Link>
                    </li>

                </ul>
            </aside>

        </div>
    )
}

export default ReviewSideMenu

