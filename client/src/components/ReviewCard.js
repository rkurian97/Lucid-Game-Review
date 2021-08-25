import React from "react";

const ReviewCard = ({ gameTitle, reviewText, username, videoGameId, rating, createdAt, id, refetch }) => {

    return (
        //Parent Div
        <div className="mt-4 ml-4 mb-5 md:p-8 p-2 bg-white max-h rounded-lg" >


            <div className="flex items-center space-x-2 mb-5">

                <img
                    className="w-10 h-10 object-cover object-center rounded-full"
                    src="https://www.freeiconspng.com/uploads/go-back--gallery-for--contact-person-icon-png-21.png"
                    alt="random user"
                />
                <div>

                    <p className="text-gray-900 font-semibold">{username}</p>
                    <p className="text-gray-500 font-semibold text-sm">
                        {createdAt}
                    </p>
                </div>
            </div>


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
        </div>
    )
}

export default ReviewCard