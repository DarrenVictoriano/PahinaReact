import React, { useState, createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

export const PostContext = createContext();

export const PostProvider = (props) => {

    // this will return true if viewport is less than 500px
    const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

    // all post
    const [allPost, setAllPost] = useState([]);

    // userID
    const [userID, setUserID] = useState("");

    // for animation
    const [appear, setAppear] = useState(true);


    return (
        <PostContext.Provider value={{
            "mobileCheckState": isMobile,
            "allPostState": [allPost, setAllPost],
            "userIDState": [userID, setUserID],
            "appearState": [appear, setAppear]
        }}>
            {props.children}
        </PostContext.Provider>
    );
}