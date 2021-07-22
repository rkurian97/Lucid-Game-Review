import React, { useState, useEffect } from "react";
import FriendCard from "../components/FriendCard";
import Auth from '../utils/auth';
import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_USER } from "../utils/queries";
import SocialSideMenu from "../components/SocialSideMenu";

function AddFriends() {
    const [searchedFriend] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        console.log(searchedFriend)
      },[searchedFriend])

    const [ search, {data}] = useLazyQuery(FIND_USER, {
        variables: { username: searchInput }
      });

      console.log('Data from lazy load!!', data)

    // const handleFormSubmit= async(event)  =>{
    //     event.preventDefault()
    //     await search()
        
    //     console.log('Data to set friends w ', data);
    //     setsearchedFriends(data);
    // }

    const handleFormSubmit= (e) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        e.preventDefault()
        return search()
    }

    console.log( 'searchedFriend!!!!!', searchedFriend)

    return (
        <div className="h-screen w-screen flex bg-gray-200">
            <SocialSideMenu/>

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
                        data
                        ? (
                            <FriendCard username={data.user.username} id={data.user._id} search={true}/>
                        )
                        :(
                            <p></p>
                        )
                    }
                </div>

                <div>
                    <FriendCard/>
                </div>
            </div>
        </div>
    );
};

export default AddFriends;