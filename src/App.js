//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";

//> Components
/**
 * Footer: Global Footer
 * Navbar: Global navigation bar
 */
import { Footer } from "./components/molecules";
import { ScrollToTop } from "./components/atoms";
// Routes
import Routes from "./Routes";

class App extends React.Component {
  componentDidMount = () => {
    console.log("Version: " + process.env.REACT_APP_VERSION);
  };

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="flyout">
            <main>
              <Routes />
            </main>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
