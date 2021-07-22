import React from "react";

import AddReview from "../components/AddReview";
const Profile = () => {
    return (
        <div className="h-screen w-screen flex bg-gray-200">
            <aside
                className="flex flex-col items-center bg-white text-gray-700 shadow h-full">

                <ul>
                    <li className="hover:bg-gray-100">
                        <a
                            href="."
                            className="h-16 px-6 flex flex justify-center items-center w-full
                focus:text-orange-500">
                            Posts

                        </a>
                    </li>

                    <li className="hover:bg-gray-100">
                        <a
                            href="."
                            className="h-16 px-6 flex flex justify-center items-center w-full
				focus:text-orange-500">
                            Add

                        </a>
                    </li>

                </ul>
            </aside>




            <AddReview/>
            


        </div>
    );
};

export default Profile;