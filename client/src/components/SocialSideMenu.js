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
                            Follow
                        </Link>
                    </li>

                    <li className="hover:bg-gray-100">
                        <Link
                            to="/friendposts"
                            className="h-16 px-6 flex flex text-sm font-medium text-xl bg-transparent text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent transition ease-in duration-200 self-center">
                            Posts

                        </Link>
                    </li>

                </ul>
            </aside>

        </div>
    )
}

export default SocialSideMenu