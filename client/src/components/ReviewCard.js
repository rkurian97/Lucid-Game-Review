import React from "react";

import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from "../utils/mutations";


import Auth from '../utils/auth';

const ReviewCard = ({gameTitle, reviewText, username, videoGameId, rating, createdAt, profile, id, refetch}) => {
    const [removeReview] = useMutation(DELETE_REVIEW);

    const deleteReview = async() => {
        //checking if user is logged in
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            //removing Review from Database
            await removeReview({
                variables: {reviewID: id} 
            });
            //Trying to loop through user reviews in user data from useQuery and change it causing parent component to rerender. 
            refetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        //Parent Div
        <div className="mt-4 ml-4 mb-5 md:p-8 p-2 bg-white max-h" >

            <img
                className="rounded-lg w-8/12"
                src="https://assets.nintendo.com/image/upload/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero"
                alt="game"
            />


            <p className="text-red-500 font-semibold text-base mt-2">Rating: {rating}</p>

            <h1
                className="font-semibold text-gray-900 leading-none text-l mt-1 capitalize"
            >
                {gameTitle}
            </h1>

            <div className="max-w-5/12">
                <p className="text-base font-small tracking-wide text-gray-600 mt-1">
                    {reviewText}
                </p>
            </div>

            {
                profile
                    ? (
                        <div className='mt-3 self-auto'>
                            <button onClick={deleteReview} className="uppercase p-3 flex items-center bg-red-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12 ">
                                <svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style={{ transform: "rotate(360deg)" }}>
                                    <path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path>
                                    <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path>
                                    <path d="M12 2h8v2h-8z" fill="currentColor"></path>
                                </svg>
                            </button>
                        </div>
                    )
                    : (
                        <div className="flex items-center space-x-2 mt-20">

                            <img
                                className="w-10 h-10 object-cover object-center rounded-full"
                                src="https://www.freeiconspng.com/uploads/go-back--gallery-for--contact-person-icon-png-21.png"
                                alt="random user"
                            />
                            <div>

                                <p className="text-gray-900 font-semibold">{username}</p>
                                <p className="text-gray-500 font-semibold text-sm">
                                    {createdAt}
                                </p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ReviewCard