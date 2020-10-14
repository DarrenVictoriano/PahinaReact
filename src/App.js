import React from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import Helmet from 'react-helmet';
import Home from './components/content/home/home';
import Portfolio from './components/content/porfolio/portfolio';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PostPage from './components/content/posts/postPage';
import PostBody from './components/content/posts/postBody';
import PostForm from './components/content/posts/postForm';
import Login from './components/auth/login';
import { useCookies } from 'react-cookie';
import PageNotFound from './components/notfound/pageNotFound';

function App() {

  const [cookies] = useCookies(['token']);

  return (
    <Router>
      <div className="App container-fluid px-0">

        <Helmet bodyAttributes={{ style: 'background-color : #0a192f' }} />
        <NavBar />

        <Switch> {/* switch should only contain routes and no other elements, otherwise it wont work correctly */}
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/portfolio" component={Portfolio} />
          <Route exact={true} path="/deets" component={cookies.token ? PostForm : Login} />
          <Route exact={false} path="/deets/:id" component={cookies.token ? PostForm : PageNotFound} />
          <Route exact={true} path="/blog" component={PostPage} />
          <Route exact={false} path="/blog/:id" component={PostBody} />

          <Redirect from="/logout" to="/" />

          <Route component={PageNotFound} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
