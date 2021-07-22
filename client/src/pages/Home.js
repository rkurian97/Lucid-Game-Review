import React from "react";
import ReviewCard from "../components/ReviewCard";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_ALL_REVIEWS } from "../utils/queries";

const Home = () => {
    const { data } = useQuery(QUERY_ALL_REVIEWS)
    if(data){
        console.log(data.allreviews)
    }
    return (
        <div className="antialiased md:bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {
                        data && data.allreviews.map(
                            (review, _index) => 
                                <ReviewCard
                                    key={_index}
                                    reviewText={review.reviewText}
                                    username={review.username}
                                    videoGameId= {review.videoGameId}
                                    rating= {review.rating}
                                    createdAt= {review.createdAt}
                                />
                            )
                    }
            </div>
        </div>
    );
};

export default Home;