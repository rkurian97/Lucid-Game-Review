import React from "react";

const AddFriends = () => {
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
                            Follow

                        </a>
                    </li>

                    <li className="hover:bg-gray-100">
                        <a
                            href="."
                            className="h-16 px-6 flex flex justify-center items-center w-full
				focus:text-orange-500">
                            Posts

                        </a>
                    </li>

                </ul>
            </aside>

            <div class="flex flex-col w-full flex-wrap">
                <div className="w-6/12 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative mt-3 mr-auto ml-auto">
                    <input type="search" name="search" id="search" placeholder="Search"
                        className="appearance-none w-full outline-none focus:outline-none active:outline-none" />
                    <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFriends;