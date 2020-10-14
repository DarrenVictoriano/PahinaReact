import React, { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../../providers/postContext';
import './postStyles.css';
import '../../../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import CodeBlock from './codeBlock';
import TextareaAutosize from 'react-textarea-autosize';
import { CSSTransition } from 'react-transition-group';

const PostForm = (props) => {

    const { mobileCheckState, appearState } = useContext(PostContext);
    const [appear] = appearState;

    const isMobile = mobileCheckState;
    const [cookies] = useCookies(['token', 'userID']);

    const [markdownTitle, setMarkdownTitle] = useState("");
    const [markdownBody, setMarkDownBody] = useState("");

    let history = useHistory();

    // get the ID from the URL
    const { id } = useParams();

    // build data
    let data = {
        "title": markdownTitle,
        "overview": markdownBody.length > 100 ? markdownBody.slice(0, 200) : markdownBody,
        "body": markdownBody
    }

    // build header
    let headerConfig = {
        "headers": {
            "x-header-token": cookies.token
        }
    }

    useEffect(() => {
        if (id) {
            // get one post
            axios.get("/api/v1/post/" + id)
                .then(item => {
                    setMarkdownTitle(item.data.title);
                    setMarkDownBody(item.data.body);
                })
                .catch(err => {
                    setMarkdownTitle("");
                    setMarkDownBody("");
                })
        } else {
            setMarkdownTitle("");
            setMarkDownBody("");
        }
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault();

        // do some edits
        axios.put("/api/v1/post/" + id, data, headerConfig)
            .then(updatedItem => {
                // view the article
                history.push("/blog/" + id);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handlePublish = (event) => {
        event.preventDefault();

        // save as new
        axios.post("/api/v1/post", data, headerConfig)
            .then(itemPosted => {
                // then view the article
                history.push("/blog/" + itemPosted.data._id);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={"container-fluid " + (isMobile ? "mt-8" : "mt-10")}>
            <CSSTransition
                in={appear}
                appear={true}
                timeout={1000}
                classNames="fade"
            >
                <div className="row">
                    <div className="col-lg-6">
                        <Form>
                            <Form.Group controlId="postFormTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={markdownTitle}
                                    onChange={e => setMarkdownTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicBody">
                                <Form.Label>Body</Form.Label>
                                <TextareaAutosize
                                    className="form-control"
                                    placeholder="Mardown body..."
                                    minRows="40"
                                    value={markdownBody}
                                    onChange={e => setMarkDownBody(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="text-center" controlId="formBasicSubmit">
                                {
                                    id ? <Button onClick={handleUpdate} variant="info">
                                        Update
                                    </Button>
                                        : <Button onClick={handlePublish} variant="info">
                                            Publish
                                    </Button>
                                }
                            </Form.Group>

                        </Form>
                    </div>
                    <div className={"col-lg-6 "}>
                        <div className="p-1">
                            <h1 className="mb-4">{markdownTitle}</h1>
                            <ReactMarkdown
                                source={markdownBody}
                                escapeHtml={false}
                                renderers={{ code: CodeBlock }}
                            />
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default PostForm;