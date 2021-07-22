import React from "react";
import SocialSideMenu from "../components/SocialSideMenu";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_MY_FRIENDS } from "../utils/queries";
// import ReviewCard from "../components/ReviewCard";

const FriendPosts =  () => {
    const { data } = useQuery(QUERY_MY_FRIENDS);
    const userData = data?.me.friends || {};
    console.log(userData)
    return (
        <div className="h-screen w-screen flex bg-gray-200">
            <SocialSideMenu />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            </div>
        </div>
    );
};

export default FriendPosts;