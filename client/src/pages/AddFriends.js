import React, { useState } from "react";
import FriendCard from "../components/FriendCard";
import Auth from '../utils/auth';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { FIND_USER } from "../utils/queries";
import { QUERY_MY_FRIENDS } from "../utils/queries";
import SocialSideMenu from "../components/SocialSideMenu";

const AddFriends = () => {

    // renaming the query variables as 2 queries are used in this component, getting refetch again to pass into child component
    const { data: data2, refetch } = useQuery(QUERY_MY_FRIENDS);
    const userData = data2?.me.friends || {};

    const [searchInput, setSearchInput] = useState('');
    //Lazy query to find user on button click
    const [search, {data}] = useLazyQuery(FIND_USER);

    // Searches for user so that logged in user can follow
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false; 
        }
        search({
            variables: { username: searchInput },
            suspend: false
        });
        
    }

    //
    return (
        <div className="h-screen w-screen flex bg-gray-200">
            <SocialSideMenu />
            <div className="grid grid-cols-2 w-full flex-wrap">
                <div>
                    <form onSubmit={handleFormSubmit} className="w-6/12 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative mt-3 mr-auto ml-auto">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text" placeholder="Search"
                            className="appearance-none w-full outline-none focus:outline-none active:outline-none">
                        </input>
                        <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </form>
                    {
                        data?.user && <FriendCard username={data.user.username} id={data.user._id} refetch={refetch} search={true}  />
                    }
                </div>

                <div className='mt-14 ml-5'>
                    {
                        userData?.[0] && userData.map(
                            (friend, _index) =>
                                <FriendCard
                                    key={_index}
                                    username={friend.username}
                                    id={friend._id}
                                    refetch={refetch}
                                    search={false}
                                />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AddFriends;