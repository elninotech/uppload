(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('uppload')) :
	typeof define === 'function' && define.amd ? define('uppload-angular', ['exports', '@angular/core', 'uppload'], factory) :
	(factory((global['uppload-angular'] = {}),global.ng.core,global.Uppload));
}(this, (function (exports,core,Uppload) { 'use strict';

Uppload = Uppload && Uppload.hasOwnProperty('default') ? Uppload['default'] : Uppload;

var UpploadEndpoint = /** @class */ (function () {
    function UpploadEndpoint() {
    }
    return UpploadEndpoint;
}());
var UpploadCrop = /** @class */ (function () {
    function UpploadCrop() {
    }
    return UpploadCrop;
}());
var UpploadSettings = /** @class */ (function () {
    function UpploadSettings() {
    }
    return UpploadSettings;
}());
var UpploadEvents = /** @class */ (function () {
    function UpploadEvents() {
    }
    return UpploadEvents;
}());
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
var UpploadComponent = /** @class */ (function () {
    function UpploadComponent() {
        this.event = new core.EventEmitter();
    }
    UpploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uppload = new Uppload(this.settings);
        Object.keys(UpploadEvents).forEach(function (event) {
            _this.uppload.on(event, function (payload) { return _this.event.emit({ event: event, payload: payload }); });
        });
    };
    UpploadComponent.prototype.changePage = function (param) {
        return this.uppload.changePage(param);
    };
    UpploadComponent.prototype.closeModal = function () {
        return this.uppload.closeModal();
    };
    UpploadComponent.prototype.openModal = function () {
        return this.uppload.openModal();
    };
    UpploadComponent.prototype.updateValue = function (param) {
        return this.uppload.updateValue(param);
    };
    UpploadComponent.prototype.uploadFile = function (param) {
        return this.uppload.uploadFile(param);
    };
    return UpploadComponent;
}());
UpploadComponent.decorators = [
    { type: core.Component, args: [{
                selector: "uppload",
                template: "\n    <ng-content></ng-content>\n  "
            },] },
];
UpploadComponent.propDecorators = {
    "settings": [{ type: core.Input },],
    "event": [{ type: core.Output },],
};
var UpploadModule = /** @class */ (function () {
    function UpploadModule() {
    }
    return UpploadModule;
}());
UpploadModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [UpploadComponent],
                exports: [UpploadComponent]
            },] },
];

exports.UpploadEvents = UpploadEvents;
exports.UpploadSettings = UpploadSettings;
exports.UpploadCrop = UpploadCrop;
exports.UpploadEndpoint = UpploadEndpoint;
exports.UpploadComponent = UpploadComponent;
exports.UpploadModule = UpploadModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uppload-angular.umd.js.map
