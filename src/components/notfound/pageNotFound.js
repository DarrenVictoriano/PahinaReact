import React, { useContext } from 'react';
import './pageNotFound.css';
import { PostContext } from '../../providers/postContext';

const PageNotFound = () => {

    const { mobileCheckState } = useContext(PostContext);
    const isMobile = mobileCheckState;

    return (
        <div className="container">
            <div className={"container text-center " + (isMobile ? "mt-100-mb" : "mt-100")}>
                <h1>such empty</h1>
                <h1><span role="img" aria-label="sad">🥺</span></h1>
            </div>
        </div>
    );

}

export default PageNotFound;