import React from "react";
import { useQuery } from '@apollo/react-hooks';
import ReviewSideMenu from "../components/ReviewSideMenu";
import { QUERY_ME } from "../utils/queries";
import ReviewCard from "../components/ReviewCard";

const EditReview = () => {
    const { data, refetch } = useQuery(QUERY_ME);
    console.log(data)
    
    return (
        <div className="h-screen w-screen bg-gray-200">
            <div className="flex">
                <ReviewSideMenu />
                
                <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-3 bg-gray-200">
                        {
                            data && data.me.reviews.map(
                                (review, _index) => 
                                    <ReviewCard
                                        key={_index}
                                        gameTitle={review.gameTitle}
                                        reviewText={review.reviewText}
                                        username={data.username}
                                        videoGameId= {review.videoGameId}
                                        rating= {review.rating}
                                        createdAt= {review.createdAt}
                                        profile={true}
                                        id= {review._id}
                                        refetch= {refetch}
                                    />
                            )
                        }
                </div>
            </div>
        </div>
    );
};

export default EditReview;