import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PostContext } from '../../../providers/postContext';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './codeBlock';
import '../../../App.css';
import { CSSTransition } from 'react-transition-group';

const PostThumbnail = ({ id, title, overview, date }) => {

    const { mobileCheckState, allPostState, appearState } = useContext(PostContext);
    const [appear] = appearState;
    const isMobile = mobileCheckState;
    const [cookies] = useCookies(['token', 'userID']);
    const [allPost, setAllPost] = allPostState;

    let history = useHistory();

    const handleEdit = (event) => {
        event.preventDefault();
        history.push("/deets/" + id);
    }

    const handleDelete = (event) => {
        event.preventDefault();

        // create header
        let headerConfig = {
            "headers": {
                "x-header-token": cookies.token
            }
        }

        // delete post
        axios.delete("/api/v1/post/" + id, headerConfig)
            .then(msg => {
                // update allPost
                // get all post
                axios.get("/api/v1/post/")
                    .then(allPost => {
                        setAllPost(allPost.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err)
            });
    }

    // TODO: make the overview markdown friendly!

    return (
        <div className={"bg-navy-light rounded container " + (isMobile ? "p-3 mb-3" : "p-5 mb-5")}>
            <CSSTransition
                in={appear}
                appear={true}
                timeout={1000}
                classNames="fade"
            >
                <div className="row">
                    <div className="col-lg-11">
                        <Link exact to={"/blog/" + id} className="link-router">
                            <h1 className={"text-slate-light mb-0 read-article"}>{title}</h1>
                        </Link>
                        <p className={"text-slate mb-0"}><Moment format="MMMM DD, YYYY" date={date} /></p>
                        <hr></hr>
                        <div className={"text-slate-light"}>
                            <ReactMarkdown
                                source={overview + "..."}
                                escapeHtml={false}
                                renderers={{ code: CodeBlock }}
                            />
                        </div>
                    </div>
                    {
                        cookies.token && <div className={"col-lg-1 " + (isMobile ? "mt-2" : "")}>
                            <Button onClick={handleEdit} className={"btn-sm btn-size " + (isMobile ? "mr-3" : "mb-3")}>
                                Edit
                        </Button>
                            <Button onClick={handleDelete} className="btn-danger btn-sm btn-size ">
                                Delete
                        </Button>
                        </div>
                    }
                </div>
            </CSSTransition>

        </div>
    );
}

export default PostThumbnail;