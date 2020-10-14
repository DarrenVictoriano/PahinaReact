import React, { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../../providers/postContext';
import './postStyles.css';
import '../../../App.css';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import axios from 'axios';
import CodeBlock from './codeBlock';
import { CSSTransition } from 'react-transition-group';

const PostBody = (props) => {

    // get the ID from the URL
    const { id } = useParams();

    const { mobileCheckState, appearState } = useContext(PostContext);
    const [appear] = appearState;
    const [post, setPost] = useState({});

    const isMobile = mobileCheckState;

    useEffect(() => {
        axios.get("/api/v1/post/" + id)
            .then(item => {
                setPost(item.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id])


    return (
        <div className={"container text-slate-light " + (isMobile ? "mt-8" : "mt-10")}>
            <CSSTransition
                in={appear}
                appear={true}
                timeout={1000}
                classNames="fade"
            >
                <div className={"bg-navy-light mb-5 container rounded " + (isMobile ? "p-3" : "p-5")}>
                    <h1 className="text-slate-light mb-0">{post.title}</h1>
                    <p className="text-slate mb-0">by: Darren Victoriano</p>
                    <p className="text-slate">
                        <Moment format="MMMM DD, YYYY" date={post.date_created} />
                    </p>
                    <hr className="mb-4"></hr>
                    <ReactMarkdown
                        source={post.body}
                        escapeHtml={false}
                        renderers={{ code: CodeBlock }}
                    />

                </div>
            </CSSTransition>
        </div>

    );
}

export default PostBody;