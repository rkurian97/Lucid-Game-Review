import React, { useState } from "react";

import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW, UPDATE_REVIEW } from "../utils/mutations";


import Auth from '../utils/auth';

const EditReviewCard = ({ gameTitle, reviewText, username, videoGameId, rating, createdAt, id, refetch }) => {
    const [removeReview] = useMutation(DELETE_REVIEW);
    const [updateReview]= useMutation(UPDATE_REVIEW);

    const [editReviewMode, setEditReviewMode] = useState(false)

    const [editReviewFormData, setEditReviewFormData] = useState({ gameTitle: gameTitle, reviewText: reviewText, rating: rating });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditReviewFormData({ ...editReviewFormData, [name]: value });
    };

    // Seperate watch for change specifically for the rating since it needs to be parsed into Int
    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        setEditReviewFormData({ ...editReviewFormData, [name]: parseInt(value) });
    };

    //update review on form submit
    const handleFormSubmit= async (e)=> {
        e.preventDefault()
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try{
            await updateReview({
                variables: {...editReviewFormData, reviewID: id }
            })
            setEditReviewMode(!editReviewMode)
            refetch();
        } catch(err){
            console.log(err)
        }


    }

    const deleteReview = async (e) => {
        //checking if user is logged in
        e.preventDefault();
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

    const changeEditMode = (e) => {
        e.preventDefault();
        setEditReviewMode(!editReviewMode)
    }

    return (
        //Parent Div
        <div className="mt-4 ml-4 mb-5 md:p-8 p-2 bg-white max-h rounded-lg" >

            <img
                className=" ml-auto mr-auto rounded-lg w-96"
                src={videoGameId}
                alt="game"
            />

            <form onSubmit={handleFormSubmit}>
                <p className="text-red-500 font-semibold text-base mt-2">Rating:
                    {
                        !editReviewMode
                            ? (rating)
                            : (
                                <input
                                    type="number"
                                    className=" ml-2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="rating"
                                    id="rating" min="0" max="10"
                                    defaultValue={rating}
                                    onChange={handleNumberChange}
                                    
                                >
                                    
                                </input>
                            )
                    }
                </p>

                <h1 className="font-semibold text-gray-900 leading-none text-l mt-1 capitalize">
                    {
                        !editReviewMode
                            ? (gameTitle)
                            : (
                                <input
                                    type="text"
                                    className="mt-1 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="gameTitle"
                                    id="gameTitle"
                                    defaultValue={gameTitle}
                                    onChange={handleInputChange}
                                >
                                    
                                </input>
                            )

                    }
                </h1>

                <div className="max-w-5/12">
                    {
                        !editReviewMode
                            ? (
                                <p className="text-base font-small tracking-wide text-gray-600 mt-1">
                                    {reviewText}
                                </p>
                            )
                            : (
                                <textarea
                                    type="text"
                                    className=" mt-2 w-full h-32  text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="reviewText"
                                    id="reviewText"
                                    defaultValue={reviewText}
                                    onChange={handleInputChange}
                                >
                                    
                                </textarea>
                            )
                    }
                </div>


                <div className='mt-3 flex justify-center'>
                    <button onClick={deleteReview} className="py-2 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                        <svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style={{ transform: "rotate(360deg)" }}>
                            <path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path>
                            <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path>
                            <path d="M12 2h8v2h-8z" fill="currentColor"></path>
                        </svg>
                    </button>

                    {
                        !editReviewMode
                            ? (
                                <button onClick={changeEditMode} className=" ml-5 py-2 px-4 bg-transparent text-gray-800 font-semibold border border-gray-800 rounded hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            )
                            : (
                                <button type='submit' className=" ml-5 py-2 px-4 bg-transparent text-gray-800 font-semibold border border-gray-800 rounded hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                </button>
                            )
                    }

                </div>
            </form>

        </div>
    )
}

export default EditReviewCard