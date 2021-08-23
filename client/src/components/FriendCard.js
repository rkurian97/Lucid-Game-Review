import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FRIEND, DELETE_FRIEND } from "../utils/mutations";

const FriendCard = ({ username, id, refetch, search }) => {
    const [addFriend] = useMutation(ADD_FRIEND)
    const [deleteFriend] = useMutation(DELETE_FRIEND)

    const handleFollow = async () => {
        try {
            //add Friend to Database
            await addFriend({
                variables: { friendId: id }
            });
            //refetch to re render parent component
            refetch();
        } catch (err) {
            console.error(err);
        }

    }

    const handleUnfollow = async () => {
        try {
            //removing Friend from Database
            console.log(id)
            await deleteFriend({
                variables: { friendId: id }
            });
            //refetch to re render parent component
            refetch();
        } catch (err) {
            console.error(err);
        }

    }

    // Conditionally render delete button or follow button depending on state
    return (
        <div className="m-auto">
            <div className="flex flex-col bg-white max-w-md shadow-md py-8 px-10 md:px-8 rounded-md mr-auto ml-auto mt-5">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 mr-auto ml-auto">
                    <img className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto" src="https://www.freeiconspng.com/uploads/go-back--gallery-for--contact-person-icon-png-21.png" alt="" />
                    <div className="flex flex-col text-center md:text-left">
                        <div className="font-medium text-lg text-gray-800">{username}</div>
                    </div>

                    {
                        search
                            ? (
                                <button onClick={handleFollow} className="py-2 px-10 bg-transparent text-gray-800 font-semibold border border-gray-800 rounded hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </button>
                            )
                            : (
                                <button onClick={handleUnfollow} className="py-2 px-10 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                                    </svg>
                                </button>
                            )
                    }

                </div>
            </div>
        </div>

    )
}

export default FriendCard

