import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "../dist/index";

class App extends React.Component {
	render() {
		return <HelloWorld title="Hello World" />;
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));
