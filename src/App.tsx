import * as React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";

import Menu from "./components/structure/Menu";
import Nav from "./components/structure/Nav";

// get the screens
import Home from "./components/screens/Home/Home";
import { Terms } from "./components/screens/Terms";
import { About } from "./components/screens/About";
import Login from "./components/screens/Login/Login";
import Signup from "./components/screens/Login/Signup";

import MyProfile from "./components/screens/Profile/MyProfile";



class App extends React.Component {

  public componentDidMount() {
    const win = (window as any);
    if(win.Stripe){
      win.Stripe.setPublishableKey(process.env.REACT_APP_STRIPE || "pk_MYg1zlteHFYG6Z4h68CLgWjAtiqvM");
    }
    // we need to detect the site setup status

  }

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Menu>
            <div className="container-fluid">
              <Nav />
              <div>
                <div className="row" style={{marginTop: 20}}>
                  <div className="col-10 offset-1 justify-content-center">
                    <main>
                      <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/terms" component={Terms} />
                        <Route exact={true} path="/about" component={About} />
                        <Route exact={true} path="/login" component={Login} />
                        <Route exact={true} path="/signup" component={Signup} />

                        <Route exact={true} path="/me" component={MyProfile} />

                      </Switch>
                    </main>
                  </div>
                </div>

                <footer>
                  <div className="row" style={{marginTop: 20}}>
                    <div className="col-12" style={{ "textAlign": "center" }}>
                      <p className="small">Copyright 2010-2019 <a href="https://www.kvsstechnologies.com" target="_new">KVSS Technologies, LLC</a> and <a target="_new" href="https://treelightsoftware.com">Treelight Software Inc</a></p>
                      <p className="small">Use of this application constitutes agreement with our <a href="/terms" target="_new">Terms of Service and Privacy Policy</a></p>
                    </div>
                  </div>
                </footer>
              </div>


              <ReduxToastr
                timeOut={3000}
                newestOnTop={false}
                preventDuplicates={true}
                position="top-center"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar={true} />
            </div>
          </Menu>
        </Router>
      </Provider>
    );
  }
}

export default App;
