import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import GetTopBooks from "./GetTopBooks";
import Footer from "./Footer";
import AddYourBook from "./AddYourBook";
import GetBookInfo from "./GetBookInfo";
import UseBackgroundMusic from "./UseBackgroundMusic";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <UseBackgroundMusic />
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <GetTopBooks />
            </Route>
            <Route path="/add-your-book">
              <AddYourBook />
            </Route>
            <Route path="/get-book-info/:genre/:book_id/*">
              <GetBookInfo />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
