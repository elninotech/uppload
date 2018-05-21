import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import Uppload from "uppload";

import { UpploadEvents, UpploadSettings } from "./uppload.settings";

@Component({
	selector: "uppload",
	template: `
    <ng-content></ng-content>
  `
})
export class UpploadComponent implements OnInit {
	@Input() public settings: UpploadSettings;
	@Output() public event = new EventEmitter();

	private uppload: Uppload;

	ngOnInit() {
		// Initialize new instance
		this.uppload = new Uppload(this.settings);

		// Hook all events up to the `event` output
		Object.keys(UpploadEvents).forEach(event => {
			this.uppload.on(event, payload => this.event.emit({ event, payload }));
		});
	}

	// Expose public methods
	public changePage(param) {
		return this.uppload.changePage(param);
	}

	public closeModal() {
		return this.uppload.closeModal();
	}

	public openModal() {
		return this.uppload.openModal();
	}

	public updateValue(param) {
		return this.uppload.updateValue(param);
	}

	public uploadFile(param): Promise<any> {
		return this.uppload.uploadFile(param);
	}
}
