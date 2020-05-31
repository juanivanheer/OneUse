import { ElementRef, EventEmitter } from '@angular/core';
import { NgxDropzoneService } from './ngx-dropzone.service';
export declare class NgxDropzoneComponent {
    private host;
    service: NgxDropzoneService;
    constructor(host: ElementRef, service: NgxDropzoneService);
    label: string;
    multiple: boolean;
    accept: string;
    maxFileSize: number;
    showPreviews: boolean;
    preserveFiles: boolean;
    filesAdded: EventEmitter<File[]>;
    filesRejected: EventEmitter<File[]>;
    disabled: boolean;
    hovered: boolean;
    private fileInput;
    showFileSelector(): void;
    reset(): void;
    onFilesSelected(event: any): void;
    /**
     * UPDATE 10.03.2019:
     * Refactored to use HostListener and HostBindings to allow
     * for easier style overwriting from outside the component.
     */
    onDragOver(event: any): void;
    onDragLeave(event: any): void;
    onDrop(event: any): void;
    private handleFileDrop;
    private preventDefault;
}
