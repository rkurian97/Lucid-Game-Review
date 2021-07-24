import React, { useEffect } from "react";
import ReviewCard from "../components/ReviewCard";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_REVIEWS } from "../utils/queries";

const Home = () => {
    const { loading, data } = useQuery(QUERY_ALL_REVIEWS)

    useEffect(()=> {

    },[])

    if(loading){
        return <h1>....Loading</h1>
    }
    return (
        <div className="bg-gray-200 h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-200">
                    {
                        data && data.allreviews.map(
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