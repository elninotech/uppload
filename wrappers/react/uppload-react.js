import React from "react";
import Uppload from "uppload";

class UpploadReact extends React.Component {
	constructor(props) {
		super(props);
		console.log("I have been invoked!");
	}
	render() {
		return <p>Uppload</p>;
	}
}

window.UpploadReact = UpploadReact;
export default UpploadReact;
