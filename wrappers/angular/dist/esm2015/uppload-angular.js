import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import Uppload from 'uppload';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UpploadEndpoint {
}
class UpploadCrop {
}

class UpploadSettings {
}
class UpploadEvents {
}
UpploadEvents.cropEnd = "cropEnd";
UpploadEvents.cropMove = "cropMove";
UpploadEvents.cropStart = "cropStart";
UpploadEvents.dragEnter = "dragEnter";
UpploadEvents.dragLeave = "dragLeave";
UpploadEvents.dragOver = "dragOver";
UpploadEvents.fileDropped = "fileDropped";
UpploadEvents.fileError = "fileError";
UpploadEvents.fileSelected = "fileSelected";
UpploadEvents.fileUploaded = "fileUploaded";
UpploadEvents.modalClosed = "modalClosed";
UpploadEvents.modalOpened = "modalOpened";
UpploadEvents.pageChanged = "pageChanged";
UpploadEvents.uploadError = "uploadError";
UpploadEvents.uploadStarted = "uploadStarted";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UpploadComponent {
    constructor() {
        this.event = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Initialize new instance
        this.uppload = new Uppload(this.settings);
        // Hook all events up to the `event` output
        Object.keys(UpploadEvents).forEach(event => {
            this.uppload.on(event, payload => this.event.emit({ event, payload }));
        });
    }
    /**
     * @param {?} param
     * @return {?}
     */
    changePage(param) {
        return this.uppload.changePage(param);
    }
    /**
     * @return {?}
     */
    closeModal() {
        return this.uppload.closeModal();
    }
    /**
     * @return {?}
     */
    openModal() {
        return this.uppload.openModal();
    }
    /**
     * @param {?} param
     * @return {?}
     */
    updateValue(param) {
        return this.uppload.updateValue(param);
    }
    /**
     * @param {?} param
     * @return {?}
     */
    uploadFile(param) {
        return this.uppload.uploadFile(param);
    }
}
UpploadComponent.decorators = [
    { type: Component, args: [{
                selector: "uppload",
                template: `
    <ng-content></ng-content>
  `
            },] },
];
/** @nocollapse */
UpploadComponent.propDecorators = {
    "settings": [{ type: Input },],
    "event": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UpploadModule {
}
UpploadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [UpploadComponent],
                exports: [UpploadComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { UpploadEvents, UpploadSettings, UpploadCrop, UpploadEndpoint, UpploadComponent, UpploadModule };
//# sourceMappingURL=uppload-angular.js.map
