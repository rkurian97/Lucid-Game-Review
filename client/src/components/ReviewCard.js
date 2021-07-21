import React from "react";

const ReviewCard = () => {
    return (
        //Parent Div
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:p-8 p-2 bg-white">

                <img
                    className="rounded-lg w-full"
                    src="https://assets.nintendo.com/image/upload/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero"
                    alt="game"
                />


                <p className="text-indigo-500 font-semibold text-base mt-2">Science</p>

                <h1
                    className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize"
                >
                    The Legend of Zelda: Breath of the Wild
                </h1>

                <div className="max-w-full">
                    <p className="text-base font-medium tracking-wide text-gray-600 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
                        vel soluta dolore id nesciunt eum nam ipsam, eveniet cupiditate sint
                        veritatis harum odit. Iste dignissimos, ad provident nulla
                        voluptatum ut.
                    </p>
                </div>
                <div className="flex items-center space-x-2 mt-20">

                    <img
                        className="w-10 h-10 object-cover object-center rounded-full"
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                        alt="random user"
                    />
                    <div>

                        <p className="text-gray-900 font-semibold">Lugano Shabani</p>
                        <p className="text-gray-500 font-semibold text-sm">
                            Feb 24,2021
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard