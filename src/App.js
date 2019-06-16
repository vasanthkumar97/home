import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "Layout";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex"
//   }
// }));

// const classes = useStyles();

const Index = () => {
  return <div>Index</div>;
};

const About = () => {
  return <div>about</div>;
};

const Users = () => {
  return Users;
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/xyz/" component={Users} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
