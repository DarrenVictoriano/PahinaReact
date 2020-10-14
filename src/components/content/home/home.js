import React, { useContext } from 'react';
import { PostContext } from '../../../providers/postContext';
import './home.css';
import '../../../App.css';
import { CSSTransition } from 'react-transition-group';

const Home = () => {

    const { mobileCheckState, appearState } = useContext(PostContext);
    const [appear] = appearState;
    const isMobile = mobileCheckState;

    return (
        <CSSTransition
            in={appear}
            appear={true}
            timeout={1000}
            classNames="fade"
        >
            <div className={"text-center " + (isMobile ? "home-content-mb" : "home-content")}>
                <p className={"text-slate-lighter mb-0 p-0 " + (isMobile ? "home-content-title-mb" : "home-content-title")}>
                    Software Engineer
                </p>
                <hr className={(isMobile ? "title-hr-mb" : "title-hr")} />
                <p className={"text-slate " + (isMobile ? "home-content-desc-mb mx-2" : "lead")}>
                    Specializing in Test Automation and developing FullStack Web Application.
                </p>
                <div className="media-icons">
                    <a href="https://www.linkedin.com/in/darren-victoriano/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                    <a href="https://github.com/DarrenVictoriano" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github fa-2x"></i>
                    </a>
                    <a href="mailto:darren.victoriano@gmail.com">
                        <i className="fas fa-envelope fa-2x"></i>
                    </a>
                </div>
            </div>
        </CSSTransition>
    );
}

export default Home;