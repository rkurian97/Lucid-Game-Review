import React, { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_REVIEWS } from "../utils/queries";

const Home = () => {
    const [reviews, setData] = useState([])

    const { data } = useQuery(QUERY_ALL_REVIEWS)
    console.log(data)
        
   
    return (
        <div className="bg-gray-200 h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-200">
                    {
                        reviews && reviews.map(
                            (review, _index) => 
                                <ReviewCard
                                    key={_index}
                                    gameTitle={review.gameTitle}
                                    reviewText={review.reviewText}
                                    username={review.username}
                                    videoGameId= {review.videoGameId}
                                    rating= {review.rating}
                                    createdAt= {review.createdAt}
                                    profile={false}
                                />
                            )
                    }
            </div>
        </div>
    );
};

export default Home;