import React, { useContext } from 'react';
import { PostContext } from '../../../providers/postContext';
import './portfolio.css';
import '../../../App.css';
import { CSSTransition } from 'react-transition-group';

const Portfolio = () => {

    const { mobileCheckState, appearState } = useContext(PostContext);
    const isMobile = mobileCheckState;
    const [appear] = appearState;

    const projects = [
        {
            "id": "001",
            "src": "/portfolio/atvaudit-500x350.png",
            "title": "atvAudit",
            "body": "A fullstack web application that scans an Android device for all the packages currently installed in it and will highlight the application/s that had an update compared to the last time the atvAuto last scanned the same device device.",
            "stacks": ["React", "Node.js", "Express", "Shell.js", "ADB", "ContextAPI"],
            "link": "https://github.com/DarrenVictoriano/atvAudit"
        },
        {
            "id": "002",
            "src": "/portfolio/atvauto-500x350.png",
            "title": "atvAuto",
            "body": "This is an AndroidTV automation framework, mostly used to stress test an Android TV. This tool uses Android Debug Shell (ADB) through IP to control the device.",
            "stacks": ["Python", "ADB", "TKinter"],
            "link": "https://github.com/DarrenVictoriano/atvAuto"
        },
        {
            "id": "003",
            "src": "/portfolio/maddpass-500x350.png",
            "title": "madPass",
            "body": "A fullstack web password manager, it uses AES (Advanced Encryption System) algorithm with a 256-bit encryption key to encrypt all the data and hashes the master password.",
            "stacks": ["React", "Node.js", "Express", "Crypto", "JSONWebToken"],
            "link": "https://madpass.herokuapp.com/"
        },
        {
            "id": "004",
            "src": "/portfolio/trivia-500x350.png",
            "title": "Trivia Game",
            "body": "This is a timed trivia game. With 10 random question every set, you have 15 seconds to answer each question correctly. This repo uses the Open Trivia DataBase API: https://opentdb.com/api_config.php",
            "stacks": ["HTML5/CSS3", "Bootstrap4", "JavaScript", "Ajax"],
            "link": "https://darrenvictoriano.github.io/TriviaGame/"
        },
        {
            "id": "005",
            "src": "/portfolio/word-500x350.png",
            "title": "Word Guess Game",
            "body": "This is a responsive web browser game based on the classic Hangman game. This also uses bootstrap framework to make the webpage responsive. The algorithmn are written in JavaScript and jQuery.",
            "stacks": ["HTML5/CSS3", "Bootstrap4", "JavaScript", "Ajax"],
            "link": "https://darrenvictoriano.github.io/Word-Guess-Game/"
        },
        {
            "id": "006",
            "src": "/portfolio/scrape-500x350.png",
            "title": "Article Scraper",
            "body": "Simple web scraping web app that utilize NodeJS's Cheerio framework to scrape data from the web. Mongoose Framework to create a model for the data that was scraped as well as saving it to MongoDB.",
            "stacks": ["Node.js", "Express", "MongoDB", "Cheerio"],
            "link": "https://article-scrapers.herokuapp.com/"
        }
    ];

    const contentCreator = (pos, project) => {

        if (pos === "left") {
            return (
                <div key={project.id} id={project.id} className={"row mb-7 " + (isMobile ? " " : "mx-5")}>
                    <div className="col-lg-6">
                        <div className={(isMobile ? "text-center" : "text-right")}>
                            <img alt={project.title} src={project.src} className="img-fluid rounded" />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className={"text-left " + (isMobile ? "pt-3 " : "mt-5 pt-3 pr-5")}>
                            <a className="learn-more" target="_blank" rel="noopener noreferrer" href={project.link}>
                                <h3>{project.title}</h3>
                            </a>

                            <p>{project.body + " "}</p>


                            <div className={"text-green small " + (isMobile ? "text-center" : " ")}>
                                {project.stacks.map((item) => (
                                    <span className={(isMobile ? "px-1" : "px-3")}>{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className="project-hr mt-7" />
                </div>
            );
        } else {
            return (
                <div key={project.id} id={project.id} className={"row mb-7 " + (isMobile ? " " : "mx-5")}>
                    <div className="col-lg-6">
                        <div className={"text-right " + (isMobile ? "pt-3 " : "mt-5 pt-3 pl-5")}>
                            <a className="learn-more" target="_blank" rel="noopener noreferrer" href={project.link}>
                                <h3>{project.title}</h3>
                            </a>

                            <p>{project.body + " "}</p>
                            <div className={"text-green small " + (isMobile ? "text-center" : " ")}>
                                {project.stacks.map((item) => (
                                    <span className={(isMobile ? "px-1" : "px-3")}>{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className={(isMobile ? "text-center" : "text-left")}>
                            <img alt={project.title} src={project.src} className="img-fluid rounded" />
                        </div>
                    </div>
                    <hr className="project-hr mt-7" />
                </div >
            );
        }
    }

    const posPicker = (mod) => {
        if (mod === "mobile") {
            return "left";
        } else {
            if (mod % 2 === 0) {
                return "left";
            } else {
                return "right";
            }
        }
    }

    return (
        <div className={"container text-slate " + (isMobile ? "pt-8" : "pt-10")}>

            {
                projects.map((item, i) => (

                    <CSSTransition
                        in={appear}
                        appear={true}
                        timeout={1000}
                        classNames="fade"
                    >
                        {contentCreator((isMobile ? posPicker("mobile") : posPicker(i)), item)}
                    </CSSTransition>

                ))
            }

        </div>
    );
}

export default Portfolio;