import React from "react";
import Uppload from "uppload";

class UpploadReact extends React.Component {
	constructor(props) {
		super(props);
		this.Uppload = new Uppload(props.settings || {});
		this.Uppload.on("fileUploaded", url => {
			if (typeof this.props.onUpload === "function") {
				this.props.onUpload(url);
			}
		});
	}
	render() {
		return (
			<div
				onClick={event => {
					this.Uppload.openModal();
					event.preventDefault();
				}}
			>
				{this.props.children}
			</div>
		);
	}
}

window.UpploadReact = UpploadReact;
export default UpploadReact;
