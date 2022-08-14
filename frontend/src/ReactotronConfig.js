import Reactotron from "reactotron-react-js";
import {reactotronRedux} from "reactotron-redux";

Reactotron.configure({name: "gnmoa"})
    .use(reactotronRedux())
    .connect();

export default Reactotron;