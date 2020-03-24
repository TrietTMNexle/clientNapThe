import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, useHistory
} from 'react-router-dom';
import LoginPage from "./LoginPage/login";
import InfoPage from "./InfoUser/info";
import './App.css';

function App() {

    return (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <RenderLoginPage />
                </Route>
                <PrivateRoute path={"/info"}>
                    <InfoPage/>
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        auth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        auth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                auth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function RenderLoginPage() {
    let history = useHistory();

    let { from } = { from: { pathname: "/info" } };
    let login = () => {
        auth.authenticate(() => {
            history.replace(from);
        });
    };

    return (
        <LoginPage auth={auth} onActionLogin={login}/>
    );
}

export default App;
