import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../../providers/postContext';
import './postStyles.css';
import '../../../App.css';
import PostThumbnail from './postThumbnail';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

const PostPage = () => {

    const { mobileCheckState, allPostState, appearState } = useContext(PostContext);
    const [appear] = appearState;
    const isMobile = mobileCheckState;
    const [allPost, setAllPost] = allPostState;

    useEffect(() => {
        // get all post
        axios.get("/api/v1/post/")
            .then(allPost => {
                setAllPost(allPost.data)
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    return (
        <div className={"container text-slate " + (isMobile ? "pt-8" : "pt-10")}>
            {
                allPost.map((item) => (
                    <CSSTransition
                        in={appear}
                        appear={true}
                        timeout={1000}
                        classNames="fade"
                    >
                        <PostThumbnail key={item._id} id={item._id} title={item.title} date={item.date_created} overview={item.overview} />
                    </CSSTransition>
                ))
            }
        </div>
    );
}

export default PostPage;