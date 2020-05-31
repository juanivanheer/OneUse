import { __awaiter, __generator } from 'tslib';
import { Injectable, Component, Input, Output, ElementRef, ViewChild, EventEmitter, HostListener, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * UPDATE 04.04.2019:
 * Refactored to use service class to handle any
 * logic on the dropped files to allow for easier
 * unit tests and separation of concerns.
 */
var NgxDropzoneService = /** @class */ (function () {
    function NgxDropzoneService() {
        this.fileCache = [];
        this.rejectedFiles = [];
        this.previews = [];
    }
    /**
     * @return {?}
     */
    NgxDropzoneService.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.fileCache = [];
        this.rejectedFiles = [];
        this.previews = [];
    };
    /**
     * @param {?} files
     * @param {?} accept
     * @param {?} maxFileSize
     * @param {?} multiple
     * @param {?} preserveFiles
     * @param {?} showPreviews
     * @return {?}
     */
    NgxDropzoneService.prototype.parseFileList = /**
     * @param {?} files
     * @param {?} accept
     * @param {?} maxFileSize
     * @param {?} multiple
     * @param {?} preserveFiles
     * @param {?} showPreviews
     * @return {?}
     */
    function (files, accept, maxFileSize, multiple, preserveFiles, showPreviews) {
        return __awaiter(this, void 0, void 0, function () {
            var hasFiletypeFilter, i, file, preview, preview, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hasFiletypeFilter = accept !== '*';
                        /**
                         * UPDATE 12.03.2019:
                         * Added option to preserve preview images.
                         */
                        if (!preserveFiles) {
                            this.fileCache = [];
                            this.rejectedFiles = [];
                            this.previews = [];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < files.length)) return [3 /*break*/, 6];
                        file = files.item(i);
                        if (hasFiletypeFilter) {
                            if (accept.endsWith('/*')) {
                                // If a generic file type is provided, we check for a match.
                                if (accept.split('/')[0] !== file.type.split('/')[0]) {
                                    this.rejectedFiles.push(file);
                                    return [3 /*break*/, 5];
                                }
                            }
                            else {
                                // Else an exact match is required.
                                if (!accept.includes(file.type)) {
                                    this.rejectedFiles.push(file);
                                    return [3 /*break*/, 5];
                                }
                            }
                        }
                        if (maxFileSize && file.size > maxFileSize) {
                            this.rejectedFiles.push(file);
                            return [3 /*break*/, 5];
                        }
                        if (!multiple && this.fileCache.length >= 1) {
                            if (!preserveFiles) {
                                // Always emit the latest file if multi-selection and preservation are disabled.
                                this.fileCache = [file];
                            }
                            else {
                                return [3 /*break*/, 5];
                            }
                        }
                        if (!showPreviews) return [3 /*break*/, 4];
                        if (!file.type.startsWith('image')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.readFile(file)];
                    case 2:
                        preview = _a.sent();
                        if (preview) {
                            this.previews.push(preview);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        preview = {
                            data: null,
                            filename: file.name
                        };
                        this.previews.push(preview);
                        _a.label = 4;
                    case 4:
                        this.fileCache.push(file);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        result = {
                            addedFiles: this.fileCache,
                            rejectedFiles: this.rejectedFiles
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    NgxDropzoneService.prototype.readFile = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise((/**
                     * @param {?} resolve
                     * @param {?} reject
                     * @return {?}
                     */
                    function (resolve, reject) {
                        /** @type {?} */
                        var reader = new FileReader();
                        reader.onload = (/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) {
                            /** @type {?} */
                            var preview = {
                                data: ((/** @type {?} */ (e.target))).result,
                                filename: file.name
                            };
                            return resolve(preview);
                        });
                        reader.onerror = (/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) {
                            console.error("FileReader failed on file " + file.name + ". No preview image created.");
                            return reject(null);
                        });
                        reader.readAsDataURL(file);
                    }))];
            });
        });
    };
    NgxDropzoneService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxDropzoneService.ctorParameters = function () { return []; };
    return NgxDropzoneService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxDropzoneComponent = /** @class */ (function () {
    function NgxDropzoneComponent(host, service) {
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
    NgxDropzoneComponent.prototype.showFileSelector = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.fileInput.nativeElement.click();
        }
    };
    /**
     * @return {?}
     */
    NgxDropzoneComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.service.reset();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxDropzoneComponent.prototype.onFilesSelected = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var files = event.target.files;
        this.handleFileDrop(files).then((/**
         * @return {?}
         */
        function () {
            // Reset the file input value to trigger the event on new selection.
            ((/** @type {?} */ (_this.fileInput.nativeElement))).value = '';
        }));
    };
    /**
     * UPDATE 10.03.2019:
     * Refactored to use HostListener and HostBindings to allow
     * for easier style overwriting from outside the component.
     */
    /**
     * UPDATE 10.03.2019:
     * Refactored to use HostListener and HostBindings to allow
     * for easier style overwriting from outside the component.
     * @param {?} event
     * @return {?}
     */
    NgxDropzoneComponent.prototype.onDragOver = /**
     * UPDATE 10.03.2019:
     * Refactored to use HostListener and HostBindings to allow
     * for easier style overwriting from outside the component.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        this.preventDefault(event);
        this.hovered = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxDropzoneComponent.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.hovered = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxDropzoneComponent.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.preventDefault(event);
        this.hovered = false;
        this.handleFileDrop(event.dataTransfer.files);
    };
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    NgxDropzoneComponent.prototype.handleFileDrop = /**
     * @private
     * @param {?} files
     * @return {?}
     */
    function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise((/**
                     * @param {?} resolve
                     * @return {?}
                     */
                    function (resolve) {
                        if (_this.disabled) {
                            return;
                        }
                        _this.service.parseFileList(files, _this.accept, _this.maxFileSize, _this.multiple, _this.preserveFiles, _this.showPreviews)
                            .then((/**
                         * @param {?} result
                         * @return {?}
                         */
                        function (result) {
                            _this.filesAdded.next(result.addedFiles);
                            if (result.rejectedFiles.length) {
                                _this.filesRejected.next(result.rejectedFiles);
                            }
                            resolve();
                        }));
                    }))];
            });
        });
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    NgxDropzoneComponent.prototype.preventDefault = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    NgxDropzoneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-dropzone',
                    template: "<input type=\"file\" #fileInput class=\"file-input\" (change)=\"onFilesSelected($event)\" [multiple]=\"multiple\"\n  [accept]=\"accept\" />\n<div class=\"dropzone\" (click)=\"showFileSelector()\">\n  <p *ngIf=\"service.previews.length === 0\">{{ label }}</p>\n  <div class=\"preview\" [class.limit-width]=\"!p.data\" *ngFor=\"let p of service.previews\">\n    <img *ngIf=\"p.data\" [src]=\"p.data\">\n    <span *ngIf=\"p.data\">{{ p.filename }}</span>\n    <div *ngIf=\"!p.data\" class=\"preview-item\">\n      <span>{{ p.filename }}</span>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host(){display:flex;height:180px;cursor:pointer;background:#fff;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px}:host().hovered{border:2px solid #717386;color:#dfdfe4}:host().disabled{opacity:.5;cursor:no-drop}:host()>.dropzone{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;width:100%;overflow-x:auto}:host()>.dropzone>p{margin:10px auto}:host()>.dropzone>.preview{height:80%;position:relative;text-align:center;padding:0 10px;width:-webkit-max-content;width:-moz-max-content;width:max-content}:host()>.dropzone>.preview.limit-width{max-width:25%}:host()>.dropzone>.preview>img{max-height:100%;border-radius:5px;opacity:.8}:host()>.dropzone>.preview>span{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}:host()>.dropzone>.preview>.preview-item{display:flex;text-align:center;align-items:center;height:100%;padding:0 40px;overflow-wrap:break-word;border-radius:5px;background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host()>.dropzone>.preview>.preview-item>span{color:#717386;max-width:100%}.file-input{display:none}"],
                    providers: [NgxDropzoneService] // Create a new service instance for each component.
                },] },
    ];
    /** @nocollapse */
    NgxDropzoneComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgxDropzoneService }
    ]; };
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
    return NgxDropzoneComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxDropzoneModule = /** @class */ (function () {
    function NgxDropzoneModule() {
    }
    NgxDropzoneModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxDropzoneComponent
                    ],
                    exports: [
                        NgxDropzoneComponent
                    ]
                },] },
    ];
    return NgxDropzoneModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxDropzoneComponent, NgxDropzoneModule, NgxDropzoneService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtZHJvcHpvbmUvbGliL25neC1kcm9wem9uZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZHJvcHpvbmUvbGliL25neC1kcm9wem9uZS5jb21wb25lbnQudHMiLCJuZzovL25neC1kcm9wem9uZS9saWIvbmd4LWRyb3B6b25lLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVByZXZpZXcge1xuICBkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlcjtcbiAgZmlsZW5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlU2VsZWN0UmVzdWx0IHtcbiAgYWRkZWRGaWxlczogRmlsZVtdO1xuICByZWplY3RlZEZpbGVzOiBGaWxlW107XG59XG5cbi8qKlxuICogVVBEQVRFIDA0LjA0LjIwMTk6XG4gKiBSZWZhY3RvcmVkIHRvIHVzZSBzZXJ2aWNlIGNsYXNzIHRvIGhhbmRsZSBhbnlcbiAqIGxvZ2ljIG9uIHRoZSBkcm9wcGVkIGZpbGVzIHRvIGFsbG93IGZvciBlYXNpZXJcbiAqIHVuaXQgdGVzdHMgYW5kIHNlcGFyYXRpb24gb2YgY29uY2VybnMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hEcm9wem9uZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHJpdmF0ZSBmaWxlQ2FjaGU6IEZpbGVbXSA9IFtdO1xuICBwcml2YXRlIHJlamVjdGVkRmlsZXM6IEZpbGVbXSA9IFtdO1xuICBwcmV2aWV3czogRmlsZVByZXZpZXdbXSA9IFtdO1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZmlsZUNhY2hlID0gW107XG4gICAgdGhpcy5yZWplY3RlZEZpbGVzID0gW107XG4gICAgdGhpcy5wcmV2aWV3cyA9IFtdO1xuICB9XG5cbiAgYXN5bmMgcGFyc2VGaWxlTGlzdChmaWxlczogRmlsZUxpc3QsIGFjY2VwdDogc3RyaW5nLCBtYXhGaWxlU2l6ZTogbnVtYmVyLCBtdWx0aXBsZTogYm9vbGVhbixcbiAgICBwcmVzZXJ2ZUZpbGVzOiBib29sZWFuLCBzaG93UHJldmlld3M6IGJvb2xlYW4pOiBQcm9taXNlPEZpbGVTZWxlY3RSZXN1bHQ+IHtcblxuICAgIC8qKlxuICAgICAqIFVQREFURSAyNy4wMS4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdGhlIGZpbHRlciBhbGdvcml0aG0gaW50byBvbmUgZmlsdGVyKCkgbWV0aG9kIHRvIGdhaW5cbiAgICAgKiBiZXR0ZXIgcGVyZm9ybWFuY2UgYnkgaXRlcmF0aW5nIG9ubHkgb25jZS5cbiAgICAgKiBTZWUgaXNzdWUgIzEuXG4gICAgICpcbiAgICAgKiBVUERBVEUgMDkuMDMuMjAxOTpcbiAgICAgKiBSZWZhY3RvcmVkIHRvIG9uZSBzaW5nbGUgbG9vcCBhbmQgZml4ZWQgYnVnIHdoZXJlIGRpc2FibGVkIG11bHRpcGxlXG4gICAgICogc2VsZWN0aW9uIG1pZ2h0IHJldHVybiBpbnZhbGlkICh1bmZpbHRlcmVkKSBmaWxlcy5cbiAgICAgKiBBZGRlZCBpbWFnZSBwcmV2aWV3IG9wdGlvbi5cbiAgICAgKlxuICAgICAqIFVQREFURSAxMi4wMy4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdG8gdXNlIGZpbGVDYWNoZSBhbmQgZW1pdCBhbGwgZHJvcHBlZCBmaWxlc1xuICAgICAqIHNpbmNlIHRoZSBsYXN0IHJlc2V0IGlmIFtwcmVzZXJ2ZUZpbGVzXSBpcyB0cnVlLlxuICAgICAqL1xuICAgIGNvbnN0IGhhc0ZpbGV0eXBlRmlsdGVyID0gYWNjZXB0ICE9PSAnKic7XG5cbiAgICAvKipcbiAgICAgKiBVUERBVEUgMTIuMDMuMjAxOTpcbiAgICAgKiBBZGRlZCBvcHRpb24gdG8gcHJlc2VydmUgcHJldmlldyBpbWFnZXMuXG4gICAgICovXG4gICAgaWYgKCFwcmVzZXJ2ZUZpbGVzKSB7XG4gICAgICB0aGlzLmZpbGVDYWNoZSA9IFtdO1xuICAgICAgdGhpcy5yZWplY3RlZEZpbGVzID0gW107XG4gICAgICB0aGlzLnByZXZpZXdzID0gW107XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oaSk7XG5cbiAgICAgIGlmIChoYXNGaWxldHlwZUZpbHRlcikge1xuICAgICAgICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcvKicpKSB7XG4gICAgICAgICAgLy8gSWYgYSBnZW5lcmljIGZpbGUgdHlwZSBpcyBwcm92aWRlZCwgd2UgY2hlY2sgZm9yIGEgbWF0Y2guXG4gICAgICAgICAgaWYgKGFjY2VwdC5zcGxpdCgnLycpWzBdICE9PSBmaWxlLnR5cGUuc3BsaXQoJy8nKVswXSkge1xuICAgICAgICAgICAgdGhpcy5yZWplY3RlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRWxzZSBhbiBleGFjdCBtYXRjaCBpcyByZXF1aXJlZC5cbiAgICAgICAgICBpZiAoIWFjY2VwdC5pbmNsdWRlcyhmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdGVkRmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWF4RmlsZVNpemUgJiYgZmlsZS5zaXplID4gbWF4RmlsZVNpemUpIHtcbiAgICAgICAgdGhpcy5yZWplY3RlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW11bHRpcGxlICYmIHRoaXMuZmlsZUNhY2hlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGlmICghcHJlc2VydmVGaWxlcykge1xuICAgICAgICAgIC8vIEFsd2F5cyBlbWl0IHRoZSBsYXRlc3QgZmlsZSBpZiBtdWx0aS1zZWxlY3Rpb24gYW5kIHByZXNlcnZhdGlvbiBhcmUgZGlzYWJsZWQuXG4gICAgICAgICAgdGhpcy5maWxlQ2FjaGUgPSBbZmlsZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dQcmV2aWV3cykge1xuICAgICAgICBpZiAoZmlsZS50eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlJykpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aWV3ID0gYXdhaXQgdGhpcy5yZWFkRmlsZShmaWxlKTtcblxuICAgICAgICAgIGlmIChwcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdzLnB1c2gocHJldmlldyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHByZXZpZXc6IEZpbGVQcmV2aWV3ID0ge1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLm5hbWVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5wcmV2aWV3cy5wdXNoKHByZXZpZXcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlsZUNhY2hlLnB1c2goZmlsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBGaWxlU2VsZWN0UmVzdWx0ID0ge1xuICAgICAgYWRkZWRGaWxlczogdGhpcy5maWxlQ2FjaGUsXG4gICAgICByZWplY3RlZEZpbGVzOiB0aGlzLnJlamVjdGVkRmlsZXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVhZEZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8RmlsZVByZXZpZXc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8RmlsZVByZXZpZXc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5vbmxvYWQgPSBlID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlldzogRmlsZVByZXZpZXcgPSB7XG4gICAgICAgICAgZGF0YTogKGUudGFyZ2V0IGFzIEZpbGVSZWFkZXIpLnJlc3VsdCxcbiAgICAgICAgICBmaWxlbmFtZTogZmlsZS5uYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJlc29sdmUocHJldmlldyk7XG4gICAgICB9O1xuXG4gICAgICByZWFkZXIub25lcnJvciA9IGUgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlUmVhZGVyIGZhaWxlZCBvbiBmaWxlICR7ZmlsZS5uYW1lfS4gTm8gcHJldmlldyBpbWFnZSBjcmVhdGVkLmApO1xuICAgICAgICByZXR1cm4gcmVqZWN0KG51bGwpO1xuICAgICAgfVxuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCxcbiAgQWZ0ZXJWaWV3SW5pdCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEhvc3RMaXN0ZW5lcixcbiAgSG9zdEJpbmRpbmdcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hEcm9wem9uZVNlcnZpY2UsIEZpbGVQcmV2aWV3LCBGaWxlU2VsZWN0UmVzdWx0IH0gZnJvbSAnLi9uZ3gtZHJvcHpvbmUuc2VydmljZSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAndXJsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWRyb3B6b25lJyxcbiAgdGVtcGxhdGU6IGA8aW5wdXQgdHlwZT1cImZpbGVcIiAjZmlsZUlucHV0IGNsYXNzPVwiZmlsZS1pbnB1dFwiIChjaGFuZ2UpPVwib25GaWxlc1NlbGVjdGVkKCRldmVudClcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICBbYWNjZXB0XT1cImFjY2VwdFwiIC8+XG48ZGl2IGNsYXNzPVwiZHJvcHpvbmVcIiAoY2xpY2spPVwic2hvd0ZpbGVTZWxlY3RvcigpXCI+XG4gIDxwICpuZ0lmPVwic2VydmljZS5wcmV2aWV3cy5sZW5ndGggPT09IDBcIj57eyBsYWJlbCB9fTwvcD5cbiAgPGRpdiBjbGFzcz1cInByZXZpZXdcIiBbY2xhc3MubGltaXQtd2lkdGhdPVwiIXAuZGF0YVwiICpuZ0Zvcj1cImxldCBwIG9mIHNlcnZpY2UucHJldmlld3NcIj5cbiAgICA8aW1nICpuZ0lmPVwicC5kYXRhXCIgW3NyY109XCJwLmRhdGFcIj5cbiAgICA8c3BhbiAqbmdJZj1cInAuZGF0YVwiPnt7IHAuZmlsZW5hbWUgfX08L3NwYW4+XG4gICAgPGRpdiAqbmdJZj1cIiFwLmRhdGFcIiBjbGFzcz1cInByZXZpZXctaXRlbVwiPlxuICAgICAgPHNwYW4+e3sgcC5maWxlbmFtZSB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCgpe2Rpc3BsYXk6ZmxleDtoZWlnaHQ6MTgwcHg7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZDojZmZmO2NvbG9yOiM3MTczODY7Ym9yZGVyOjJweCBkYXNoZWQgIzcxNzM4Njtib3JkZXItcmFkaXVzOjVweDtmb250LXNpemU6MTZweH06aG9zdCgpLmhvdmVyZWR7Ym9yZGVyOjJweCBzb2xpZCAjNzE3Mzg2O2NvbG9yOiNkZmRmZTR9Omhvc3QoKS5kaXNhYmxlZHtvcGFjaXR5Oi41O2N1cnNvcjpuby1kcm9wfTpob3N0KCk+LmRyb3B6b25le2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6Y2VudGVyO3dpZHRoOjEwMCU7b3ZlcmZsb3cteDphdXRvfTpob3N0KCk+LmRyb3B6b25lPnB7bWFyZ2luOjEwcHggYXV0b306aG9zdCgpPi5kcm9wem9uZT4ucHJldmlld3toZWlnaHQ6ODAlO3Bvc2l0aW9uOnJlbGF0aXZlO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6MCAxMHB4O3dpZHRoOi13ZWJraXQtbWF4LWNvbnRlbnQ7d2lkdGg6LW1vei1tYXgtY29udGVudDt3aWR0aDptYXgtY29udGVudH06aG9zdCgpPi5kcm9wem9uZT4ucHJldmlldy5saW1pdC13aWR0aHttYXgtd2lkdGg6MjUlfTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3PmltZ3ttYXgtaGVpZ2h0OjEwMCU7Ym9yZGVyLXJhZGl1czo1cHg7b3BhY2l0eTouOH06aG9zdCgpPi5kcm9wem9uZT4ucHJldmlldz5zcGFue3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2NvbG9yOiNmZmZ9Omhvc3QoKT4uZHJvcHpvbmU+LnByZXZpZXc+LnByZXZpZXctaXRlbXtkaXNwbGF5OmZsZXg7dGV4dC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoxMDAlO3BhZGRpbmc6MCA0MHB4O292ZXJmbG93LXdyYXA6YnJlYWstd29yZDtib3JkZXItcmFkaXVzOjVweDtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byB0b3AsI2VkZWRlZCwjZWZlZmVmLCNmMWYxZjEsI2Y0ZjRmNCwjZjZmNmY2KX06aG9zdCgpPi5kcm9wem9uZT4ucHJldmlldz4ucHJldmlldy1pdGVtPnNwYW57Y29sb3I6IzcxNzM4NjttYXgtd2lkdGg6MTAwJX0uZmlsZS1pbnB1dHtkaXNwbGF5Om5vbmV9YF0sXG4gIHByb3ZpZGVyczogW05neERyb3B6b25lU2VydmljZV0gLy8gQ3JlYXRlIGEgbmV3IHNlcnZpY2UgaW5zdGFuY2UgZm9yIGVhY2ggY29tcG9uZW50LlxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEcm9wem9uZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBzZXJ2aWNlOiBOZ3hEcm9wem9uZVNlcnZpY2VcbiAgKSB7IH1cblxuICBASW5wdXQoKSBsYWJlbCA9ICdEcm9wIHlvdXIgZmlsZXMgaGVyZSAob3IgY2xpY2spJztcbiAgQElucHV0KCkgbXVsdGlwbGUgPSB0cnVlO1xuICBASW5wdXQoKSBhY2NlcHQgPSAnKic7XG4gIEBJbnB1dCgpIG1heEZpbGVTaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIHNob3dQcmV2aWV3cyA9IGZhbHNlO1xuICBASW5wdXQoKSBwcmVzZXJ2ZUZpbGVzID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgZmlsZXNBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuICBAT3V0cHV0KCkgZmlsZXNSZWplY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKSBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhvdmVyZWQnKSBob3ZlcmVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnZmlsZUlucHV0JykgcHJpdmF0ZSBmaWxlSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgc2hvd0ZpbGVTZWxlY3RvcigpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnNlcnZpY2UucmVzZXQoKTtcbiAgfVxuXG4gIG9uRmlsZXNTZWxlY3RlZChldmVudCkge1xuICAgIGNvbnN0IGZpbGVzOiBGaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcztcblxuICAgIHRoaXMuaGFuZGxlRmlsZURyb3AoZmlsZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgdGhlIGZpbGUgaW5wdXQgdmFsdWUgdG8gdHJpZ2dlciB0aGUgZXZlbnQgb24gbmV3IHNlbGVjdGlvbi5cbiAgICAgICh0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gJyc7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVVBEQVRFIDEwLjAzLjIwMTk6XG4gICAqIFJlZmFjdG9yZWQgdG8gdXNlIEhvc3RMaXN0ZW5lciBhbmQgSG9zdEJpbmRpbmdzIHRvIGFsbG93XG4gICAqIGZvciBlYXNpZXIgc3R5bGUgb3ZlcndyaXRpbmcgZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgIHRoaXMuaG92ZXJlZCA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBvbkRyYWdMZWF2ZShldmVudCkge1xuICAgIHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIG9uRHJvcChldmVudCkge1xuICAgIHRoaXMucHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgIHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxlRmlsZURyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlRmlsZURyb3AoZmlsZXM6IEZpbGVMaXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlcnZpY2UucGFyc2VGaWxlTGlzdChmaWxlcywgdGhpcy5hY2NlcHQsIHRoaXMubWF4RmlsZVNpemUsXG4gICAgICAgIHRoaXMubXVsdGlwbGUsIHRoaXMucHJlc2VydmVGaWxlcywgdGhpcy5zaG93UHJldmlld3MpXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IEZpbGVTZWxlY3RSZXN1bHQpID0+IHtcbiAgICAgICAgICB0aGlzLmZpbGVzQWRkZWQubmV4dChyZXN1bHQuYWRkZWRGaWxlcyk7XG5cbiAgICAgICAgICBpZiAocmVzdWx0LnJlamVjdGVkRmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVzUmVqZWN0ZWQubmV4dChyZXN1bHQucmVqZWN0ZWRGaWxlcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcHJldmVudERlZmF1bHQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hEcm9wem9uZUNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWRyb3B6b25lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neERyb3B6b25lQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ3hEcm9wem9uZUNvbXBvbmVudFxu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