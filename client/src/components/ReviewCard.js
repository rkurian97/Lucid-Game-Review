import React from "react";

const ReviewCard = (props) => {
    console.log('hit')
    return (
        //Parent Div
            <div className="mt-3 md:p-8 p-2 bg-white">

                <img
                    className="rounded-lg w-full"
                    src="https://assets.nintendo.com/image/upload/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero"
                    alt="game"
                />


                <p className="text-red-500 font-semibold text-base mt-2">Rating: { props.rating }</p>

                <h1
                    className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize"
                >
                    The Legend of Zelda: Breath of the Wild
                </h1>

                <div className="max-w-full">
                    <p className="text-base font-medium tracking-wide text-gray-600 mt-1">
                        { props.reviewText }
                    </p>
                </div>
                <div className="flex items-center space-x-2 mt-20">

                    <img
                        className="w-10 h-10 object-cover object-center rounded-full"
                        src="https://www.freeiconspng.com/uploads/go-back--gallery-for--contact-person-icon-png-21.png"  
                        alt="random user"
                    />
                    <div>

                        <p className="text-gray-900 font-semibold">{ props.username }</p>
                        <p className="text-gray-500 font-semibold text-sm">
                            {props.createdAt}
                        </p>
                    </div>
                </div>
            </div>
    )
}

export default ReviewCard