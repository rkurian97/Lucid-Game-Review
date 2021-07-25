import React, { useState } from "react";
import { useMutation, useLazyQuery} from '@apollo/react-hooks';
import ReviewSideMenu from "../components/ReviewSideMenu";
import { ADD_REVIEW } from '../utils/mutations';
import { QUERY_VIDEOGAMES } from "../utils/queries";

import Auth from '../utils/auth';
import { withRouter } from "react-router-dom";

const AddReview = () => {
    //review form data
    const [reviewFormData, setReviewFormData] = useState({ gameTitle: '', reviewText: '', rating: '' });
    const [addReview] = useMutation(ADD_REVIEW);

    //State for if the videogame is selected. They cannot post a form unless the video game is selected
    const [selectedVideoGame, setSelectedVideoGame]= useState('')

    //state for search input and lazy query to query off button click
    const [searchInput, setSearchInput] = useState('');
    const [search, {data}] = useLazyQuery(QUERY_VIDEOGAMES);

    //watches for changes in form to change search state
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewFormData({ ...reviewFormData, [name]: value });
    };

    // Seperate watch for change specifically for the rating since it needs to be parsed into Int
    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        setReviewFormData({ ...reviewFormData, [name]: parseInt(value) });
    };

    //function that queries the third party api for video game pictures
    const handleVideoGameQuery= async (e)=>{
        e.preventDefault()
        search({
            variables: { query: searchInput },
            suspend: false
        });
        if(data){
            console.log(data)
        }
    }

    // If a video game is selected than the state will change and the submit button will appear
    const handleImageClick= async (e)=>{
        await setSelectedVideoGame(e.target.src)
        console.log(selectedVideoGame)
    }

    // on form submit Add a Review to the logged in user
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            await addReview({
                variables: { ...reviewFormData, videoGameId: selectedVideoGame },
            });
            return
        } catch (err) {
            console.error(err);
        }
        setReviewFormData({
            gameTitle: '',
            reviewText: '',
            rating: '',
        });
        setSelectedVideoGame('');
    };

    return (
        <div className="h-screen w-screen flex bg-gray-200">
            <ReviewSideMenu/>
            <div className='w-2/5 mr-auto ml-auto full'>
                <div>
                    <form onSubmit={handleVideoGameQuery}className="h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative mt-3 ">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text" placeholder="Search"
                            className="appearance-none w-full outline-none focus:outline-none active:outline-none">
                        </input>
                        <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <div>
                   { 
                    data?.videogames &&  <img alt='video game query' className="mt-5 mr-auto ml-auto rounded-xl " src={data.videogames.image} onClick={handleImageClick}></img>
                   }
                </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-12 bg-white border-b border-gray-200">
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
                                    className=" px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="rating"
                                    id="rating" min="0" max="10"
                                    onChange={handleNumberChange}>
                                </input>
                            </div>

                            <div className="mb-8">
                                <label className="block mb-2 text-xl font-bold text-gray-700">Content <span className="text-red-500">*</span></label>
                                <textarea
                                    type="text"
                                    className="w-80 h-64  text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="reviewText"
                                    id="reviewText"
                                    onChange={handleInputChange}>
                                </textarea>
                            </div>

                            <div className="flex p-1">
                               {
                                   selectedVideoGame && <button type="submit" className="py-2 px-4 bg-transparent text-gray-800 font-semibold border border-gray-800 rounded hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">Submit</button>
                               } 
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default withRouter(AddReview);