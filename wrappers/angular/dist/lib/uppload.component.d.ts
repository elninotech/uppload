import { EventEmitter, OnInit } from "@angular/core";
import { UpploadSettings } from "./uppload.settings";
export declare class UpploadComponent implements OnInit {
    settings: UpploadSettings;
    event: EventEmitter<{}>;
    private uppload;
    ngOnInit(): void;
    changePage(param: any): any;
    closeModal(): any;
    openModal(): any;
    updateValue(param: any): any;
    uploadFile(param: any): Promise<any>;
}
