import { useReducer } from "react";
import {
    ADD_FRIENDS,
    // ADD_REVIEWS,
    // DELETE_FRIENDS,
    DELETE_REVIEWS
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_FRIENDS:
            return {
                ...state,
                friends: [...state.friends, action.friends]
            };
        case DELETE_REVIEWS:
            let newState = state.reviews.filter(review => {
                return review._id !== action._id;
            });

            return {
                ...state,
                reviews: newState
            };
        
    default:
        return state;
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}