import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import ReviewSideMenu from "../components/ReviewSideMenu";
import { QUERY_ME } from "../utils/queries";
import ReviewCard from "../components/ReviewCard";

const EditReview = () => {
    //Query User and we will pass refetch as prop into child component to trigger a rerender from child component if needed
    const {loading, data, refetch } = useQuery(QUERY_ME, {
        fetchPolicy: 'no-cache'
    });

    //use effect to rerender the page on mount 
    useEffect(() => {
    }, [])

    if(loading){
        return <h1>....Loading</h1>
    }
    
    // If data exists then the render page with all the Users reviews
    return (
        <div className="h-screen bg-gray-200 flex">

            <ReviewSideMenu />
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-200">
                    {
                        data && data.me.reviews.map(
                            (review, _index) =>
                                <ReviewCard
                                    key={_index}
                                    gameTitle={review.gameTitle}
                                    reviewText={review.reviewText}
                                    username={data.username}
                                    videoGameId={review.videoGameId}
                                    rating={review.rating}
                                    createdAt={review.createdAt}
                                    profile={true}
                                    id={review._id}
                                    refetch={refetch}
                                />
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default EditReview;