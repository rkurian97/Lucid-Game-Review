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
                            className="h-16 px-6 flex flex justify-center items-center w-full px-3 py-2 rounded-md text-sm font-medium text-xl text-red-500">
                            Follow
                        </Link>
                    </li>

                    <li className="hover:bg-gray-100">
                        <Link
                            to="/friendposts"
                            className="h-16 px-6 flex flex justify-center items-center w-full rounded-md text-sm font-medium text-xl text-red-500">
                            Posts

                        </Link>
                    </li>

                </ul>
            </aside>

        </div>
    )
}

export default SocialSideMenu