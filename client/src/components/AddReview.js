import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';

import { ADD_REVIEW } from '../utils/mutations';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Auth from '../utils/auth';

const AddReview = () => {
    const [reviewFormData, setReviewFormData] = useState({ gameTitle: '', reviewText: '', rating: '' });
    const [addReview] = useMutation(ADD_REVIEW);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewFormData({ ...reviewFormData, [name]: value });
    };

    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        setReviewFormData({ ...reviewFormData, [name]: parseInt(value) });
    };

    const handleTextChange= (event, editor) => {
        setReviewFormData({...reviewFormData, reviewText: editor.getData()})
        console.log(reviewFormData)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log('hit')
        if (!token) {
          return false;
        }

        try {
            console.log(reviewFormData)
            const { data } = await addReview({
                variables: { ...reviewFormData, videoGameId: '342' },
            });
        
        } catch (err) {
            console.error(err);
        }
        setReviewFormData({
            gameTitle: '',
            reviewText: '',
            rating: '',
        });
    };

    return (
        <div className=" h-screen w-screen flex bg-gray-200">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 text-xl font-bold text-gray-700">Title <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                                    name="gameTitle" 
                                    id="gameTitle"
                                    onChange={handleInputChange}>
                                </input>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-xl font-bold text-gray-700">Rating <span className="text-red-500">*</span></label>
                                <input 
                                    type="number" 
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                                    name="rating" 
                                    id="rating"  min="0" max="10"
                                    onChange={handleNumberChange}>
                                </input>
                            </div>

                            <div className="mb-8">
                                <label className="block mb-2 text-xl font-bold text-gray-700">Content <span className="text-red-500">*</span></label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={handleTextChange}
                                    className="border-2 border-gray-500"
                                />
                            </div>

                            <div className="flex p-1">
                                <button type="submit" className="p-3 bg-gray-800 text-white hover:bg-blue-900">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;