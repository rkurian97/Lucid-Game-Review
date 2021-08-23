import React from "react";
import ReviewCard from "../components/ReviewCard";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_REVIEWS } from "../utils/queries";

function Home (){
    //query all reviews from database
    const { loading, data} = useQuery(QUERY_ALL_REVIEWS, {
        fetchPolicy: 'no-cache'
    });
    
    console.log("hit")
    //use effect to rerender the page on mount 
    if(data){
        console.log(data)
    }
    if(loading){
        return <h1>....Loading</h1>
    }

    // If data exists map through data.allreviews and rerender components for each review
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