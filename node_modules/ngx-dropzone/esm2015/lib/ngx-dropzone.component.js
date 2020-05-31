/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, ViewChild, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { NgxDropzoneService } from './ngx-dropzone.service';
export class NgxDropzoneComponent {
    /**
     * @param {?} host
     * @param {?} service
     */
    constructor(host, service) {
        this.host = host;
        this.service = service;
        this.label = 'Drop your files here (or click)';
        this.multiple = true;
        this.accept = '*';
        this.showPreviews = false;
        this.preserveFiles = true;
        this.filesAdded = new EventEmitter();
        this.filesRejected = new EventEmitter();
        this.disabled = false;
        this.hovered = false;
    }
    /**
     * @return {?}
     */
    showFileSelector() {
        if (!this.disabled) {
            this.fileInput.nativeElement.click();
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.service.reset();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFilesSelected(event) {
        /** @type {?} */
        const files = event.target.files;
        this.handleFileDrop(files).then((/**
         * @return {?}
         */
        () => {
            // Reset the file input value to trigger the event on new selection.
            ((/** @type {?} */ (this.fileInput.nativeElement))).value = '';
        }));
    }
    /**
     * UPDATE 10.03.2019:
     * Refactored to use HostListener and HostBindings to allow
     * for easier style overwriting from outside the component.
     * @param {?} event
     * @return {?}
     */
    onDragOver(event) {
        if (this.disabled) {
            return;
        }
        this.preventDefault(event);
        this.hovered = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragLeave(event) {
        this.hovered = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        this.preventDefault(event);
        this.hovered = false;
        this.handleFileDrop(event.dataTransfer.files);
    }
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    handleFileDrop(files) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            resolve => {
                if (this.disabled) {
                    return;
                }
                this.service.parseFileList(files, this.accept, this.maxFileSize, this.multiple, this.preserveFiles, this.showPreviews)
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                (result) => {
                    this.filesAdded.next(result.addedFiles);
                    if (result.rejectedFiles.length) {
                        this.filesRejected.next(result.rejectedFiles);
                    }
                    resolve();
                }));
            }));
        });
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    preventDefault(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
NgxDropzoneComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-dropzone',
                template: `<input type="file" #fileInput class="file-input" (change)="onFilesSelected($event)" [multiple]="multiple"
  [accept]="accept" />
<div class="dropzone" (click)="showFileSelector()">
  <p *ngIf="service.previews.length === 0">{{ label }}</p>
  <div class="preview" [class.limit-width]="!p.data" *ngFor="let p of service.previews">
    <img *ngIf="p.data" [src]="p.data">
    <span *ngIf="p.data">{{ p.filename }}</span>
    <div *ngIf="!p.data" class="preview-item">
      <span>{{ p.filename }}</span>
    </div>
  </div>
</div>
`,
                styles: [`:host(){display:flex;height:180px;cursor:pointer;background:#fff;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px}:host().hovered{border:2px solid #717386;color:#dfdfe4}:host().disabled{opacity:.5;cursor:no-drop}:host()>.dropzone{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;width:100%;overflow-x:auto}:host()>.dropzone>p{margin:10px auto}:host()>.dropzone>.preview{height:80%;position:relative;text-align:center;padding:0 10px;width:-webkit-max-content;width:-moz-max-content;width:max-content}:host()>.dropzone>.preview.limit-width{max-width:25%}:host()>.dropzone>.preview>img{max-height:100%;border-radius:5px;opacity:.8}:host()>.dropzone>.preview>span{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}:host()>.dropzone>.preview>.preview-item{display:flex;text-align:center;align-items:center;height:100%;padding:0 40px;overflow-wrap:break-word;border-radius:5px;background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host()>.dropzone>.preview>.preview-item>span{color:#717386;max-width:100%}.file-input{display:none}`],
                providers: [NgxDropzoneService] // Create a new service instance for each component.
            },] },
];
/** @nocollapse */
NgxDropzoneComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgxDropzoneService }
];
NgxDropzoneComponent.propDecorators = {
    label: [{ type: Input }],
    multiple: [{ type: Input }],
    accept: [{ type: Input }],
    maxFileSize: [{ type: Input }],
    showPreviews: [{ type: Input }],
    preserveFiles: [{ type: Input }],
    filesAdded: [{ type: Output }],
    filesRejected: [{ type: Output }],
    disabled: [{ type: HostBinding, args: ['class.disabled',] }, { type: Input }],
    hovered: [{ type: HostBinding, args: ['class.hovered',] }],
    fileInput: [{ type: ViewChild, args: ['fileInput',] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxDropzoneComponent.prototype.label;
    /** @type {?} */
    NgxDropzoneComponent.prototype.multiple;
    /** @type {?} */
    NgxDropzoneComponent.prototype.accept;
    /** @type {?} */
    NgxDropzoneComponent.prototype.maxFileSize;
    /** @type {?} */
    NgxDropzoneComponent.prototype.showPreviews;
    /** @type {?} */
    NgxDropzoneComponent.prototype.preserveFiles;
    /** @type {?} */
    NgxDropzoneComponent.prototype.filesAdded;
    /** @type {?} */
    NgxDropzoneComponent.prototype.filesRejected;
    /** @type {?} */
    NgxDropzoneComponent.prototype.disabled;
    /** @type {?} */
    NgxDropzoneComponent.prototype.hovered;
    /**
     * @type {?}
     * @private
     */
    NgxDropzoneComponent.prototype.fileInput;
    /**
     * @type {?}
     * @private
     */
    NgxDropzoneComponent.prototype.host;
    /** @type {?} */
    NgxDropzoneComponent.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kcm9wem9uZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZHJvcHpvbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLFlBQVksRUFFM0IsWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQWlDLE1BQU0sd0JBQXdCLENBQUM7QUFxQjNGLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBRS9CLFlBQ1UsSUFBZ0IsRUFDakIsT0FBMkI7UUFEMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUczQixVQUFLLEdBQUcsaUNBQWlDLENBQUM7UUFDMUMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBRWIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFcEIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRWIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUMzQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBYjFDLENBQUM7Ozs7SUFpQkwsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsS0FBSzs7Y0FD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Q3pCLHNDQUFzQjs7SUFDdEIsMkNBQTZCOztJQUM3Qiw0Q0FBOEI7O0lBQzlCLDZDQUE4Qjs7SUFFOUIsMENBQWtEOztJQUNsRCw2Q0FBcUQ7O0lBRXJELHdDQUF5RDs7SUFDekQsdUNBQThDOzs7OztJQUU5Qyx5Q0FBc0Q7Ozs7O0lBakJwRCxvQ0FBd0I7O0lBQ3hCLHVDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSG9zdExpc3RlbmVyLFxuICBIb3N0QmluZGluZ1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neERyb3B6b25lU2VydmljZSwgRmlsZVByZXZpZXcsIEZpbGVTZWxlY3RSZXN1bHQgfSBmcm9tICcuL25neC1kcm9wem9uZS5zZXJ2aWNlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICd1cmwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZHJvcHpvbmUnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwiZmlsZVwiICNmaWxlSW5wdXQgY2xhc3M9XCJmaWxlLWlucHV0XCIgKGNoYW5nZSk9XCJvbkZpbGVzU2VsZWN0ZWQoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gIFthY2NlcHRdPVwiYWNjZXB0XCIgLz5cbjxkaXYgY2xhc3M9XCJkcm9wem9uZVwiIChjbGljayk9XCJzaG93RmlsZVNlbGVjdG9yKClcIj5cbiAgPHAgKm5nSWY9XCJzZXJ2aWNlLnByZXZpZXdzLmxlbmd0aCA9PT0gMFwiPnt7IGxhYmVsIH19PC9wPlxuICA8ZGl2IGNsYXNzPVwicHJldmlld1wiIFtjbGFzcy5saW1pdC13aWR0aF09XCIhcC5kYXRhXCIgKm5nRm9yPVwibGV0IHAgb2Ygc2VydmljZS5wcmV2aWV3c1wiPlxuICAgIDxpbWcgKm5nSWY9XCJwLmRhdGFcIiBbc3JjXT1cInAuZGF0YVwiPlxuICAgIDxzcGFuICpuZ0lmPVwicC5kYXRhXCI+e3sgcC5maWxlbmFtZSB9fTwvc3Bhbj5cbiAgICA8ZGl2ICpuZ0lmPVwiIXAuZGF0YVwiIGNsYXNzPVwicHJldmlldy1pdGVtXCI+XG4gICAgICA8c3Bhbj57eyBwLmZpbGVuYW1lIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0KCl7ZGlzcGxheTpmbGV4O2hlaWdodDoxODBweDtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6IzcxNzM4Njtib3JkZXI6MnB4IGRhc2hlZCAjNzE3Mzg2O2JvcmRlci1yYWRpdXM6NXB4O2ZvbnQtc2l6ZToxNnB4fTpob3N0KCkuaG92ZXJlZHtib3JkZXI6MnB4IHNvbGlkICM3MTczODY7Y29sb3I6I2RmZGZlNH06aG9zdCgpLmRpc2FibGVke29wYWNpdHk6LjU7Y3Vyc29yOm5vLWRyb3B9Omhvc3QoKT4uZHJvcHpvbmV7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdztqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXI7d2lkdGg6MTAwJTtvdmVyZmxvdy14OmF1dG99Omhvc3QoKT4uZHJvcHpvbmU+cHttYXJnaW46MTBweCBhdXRvfTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3e2hlaWdodDo4MCU7cG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzowIDEwcHg7d2lkdGg6LXdlYmtpdC1tYXgtY29udGVudDt3aWR0aDotbW96LW1heC1jb250ZW50O3dpZHRoOm1heC1jb250ZW50fTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3LmxpbWl0LXdpZHRoe21heC13aWR0aDoyNSV9Omhvc3QoKT4uZHJvcHpvbmU+LnByZXZpZXc+aW1ne21heC1oZWlnaHQ6MTAwJTtib3JkZXItcmFkaXVzOjVweDtvcGFjaXR5Oi44fTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3PnNwYW57cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7Y29sb3I6I2ZmZn06aG9zdCgpPi5kcm9wem9uZT4ucHJldmlldz4ucHJldmlldy1pdGVte2Rpc3BsYXk6ZmxleDt0ZXh0LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjEwMCU7cGFkZGluZzowIDQwcHg7b3ZlcmZsb3ctd3JhcDpicmVhay13b3JkO2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZWRlZGVkLCNlZmVmZWYsI2YxZjFmMSwjZjRmNGY0LCNmNmY2ZjYpfTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3Pi5wcmV2aWV3LWl0ZW0+c3Bhbntjb2xvcjojNzE3Mzg2O21heC13aWR0aDoxMDAlfS5maWxlLWlucHV0e2Rpc3BsYXk6bm9uZX1gXSxcbiAgcHJvdmlkZXJzOiBbTmd4RHJvcHpvbmVTZXJ2aWNlXSAvLyBDcmVhdGUgYSBuZXcgc2VydmljZSBpbnN0YW5jZSBmb3IgZWFjaCBjb21wb25lbnQuXG59KVxuZXhwb3J0IGNsYXNzIE5neERyb3B6b25lQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHNlcnZpY2U6IE5neERyb3B6b25lU2VydmljZVxuICApIHsgfVxuXG4gIEBJbnB1dCgpIGxhYmVsID0gJ0Ryb3AgeW91ciBmaWxlcyBoZXJlIChvciBjbGljayknO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGFjY2VwdCA9ICcqJztcbiAgQElucHV0KCkgbWF4RmlsZVNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgc2hvd1ByZXZpZXdzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHByZXNlcnZlRmlsZXMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBmaWxlc0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG4gIEBPdXRwdXQoKSBmaWxlc1JlamVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuaG92ZXJlZCcpIGhvdmVyZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnKSBwcml2YXRlIGZpbGVJbnB1dDogRWxlbWVudFJlZjtcblxuICBzaG93RmlsZVNlbGVjdG9yKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2VydmljZS5yZXNldCgpO1xuICB9XG5cbiAgb25GaWxlc1NlbGVjdGVkKGV2ZW50KSB7XG4gICAgY29uc3QgZmlsZXM6IEZpbGVMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuXG4gICAgdGhpcy5oYW5kbGVGaWxlRHJvcChmaWxlcykudGhlbigoKSA9PiB7XG4gICAgICAvLyBSZXNldCB0aGUgZmlsZSBpbnB1dCB2YWx1ZSB0byB0cmlnZ2VyIHRoZSBldmVudCBvbiBuZXcgc2VsZWN0aW9uLlxuICAgICAgKHRoaXMuZmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVUERBVEUgMTAuMDMuMjAxOTpcbiAgICogUmVmYWN0b3JlZCB0byB1c2UgSG9zdExpc3RlbmVyIGFuZCBIb3N0QmluZGluZ3MgdG8gYWxsb3dcbiAgICogZm9yIGVhc2llciBzdHlsZSBvdmVyd3JpdGluZyBmcm9tIG91dHNpZGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgb25EcmFnT3ZlcihldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgdGhpcy5ob3ZlcmVkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgb25Ecm9wKGV2ZW50KSB7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVGaWxlRHJvcChldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVGaWxlRHJvcChmaWxlczogRmlsZUxpc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VydmljZS5wYXJzZUZpbGVMaXN0KGZpbGVzLCB0aGlzLmFjY2VwdCwgdGhpcy5tYXhGaWxlU2l6ZSxcbiAgICAgICAgdGhpcy5tdWx0aXBsZSwgdGhpcy5wcmVzZXJ2ZUZpbGVzLCB0aGlzLnNob3dQcmV2aWV3cylcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogRmlsZVNlbGVjdFJlc3VsdCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmlsZXNBZGRlZC5uZXh0KHJlc3VsdC5hZGRlZEZpbGVzKTtcblxuICAgICAgICAgIGlmIChyZXN1bHQucmVqZWN0ZWRGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZXNSZWplY3RlZC5uZXh0KHJlc3VsdC5yZWplY3RlZEZpbGVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2ZW50RGVmYXVsdChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19