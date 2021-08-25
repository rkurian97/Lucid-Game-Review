import React from "react";

import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from "../utils/mutations";


import Auth from '../utils/auth';

const EditReviewCard = ({ gameTitle, reviewText, username, videoGameId, rating, createdAt, id, refetch}) => {
    const [removeReview] = useMutation(DELETE_REVIEW);

    const deleteReview = async () => {
        //checking if user is logged in
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            // removing Review from Database
            await removeReview({
                variables: { reviewID: id }
            });
            // using refetch to rerender parent component
            refetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        //Parent Div
        <div className="mt-4 ml-4 mb-5 md:p-8 p-2 bg-white max-h rounded-lg" >

            <img
                className=" ml-auto mr-auto rounded-lg w-96"
                src={videoGameId}
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


            <div className='mt-3 flex justify-center'>
                <button onClick={deleteReview} className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                    <svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style={{ transform: "rotate(360deg)" }}>
                        <path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path>
                        <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path>
                        <path d="M12 2h8v2h-8z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default EditReviewCard