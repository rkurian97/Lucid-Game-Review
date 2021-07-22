import React from "react";

const FriendCard = (props) => {
    return (
        <div className="m-auto">
            <div className="flex flex-col bg-white max-w-sm shadow-md py-8 px-10 md:px-8 rounded-md mr-auto ml-auto mt-5">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 mr-auto ml-auto">
                    <img className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto" src="https://www.freeiconspng.com/uploads/go-back--gallery-for--contact-person-icon-png-21.png" alt="" />
                    <div className="flex flex-col text-center md:text-left">
                        <div className="font-medium text-lg text-gray-800">{props.username}</div>
                    </div>

                    {
                        props.search
                            ? (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Follow
                                </button>
                            )
                            : (
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                    Unfriend
                                </button>
                            )
                    }

                </div>
            </div>
        </div>

    )
}

export default FriendCard

