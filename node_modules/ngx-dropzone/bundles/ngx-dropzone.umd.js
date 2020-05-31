(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-dropzone', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngx-dropzone'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

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
                                if (!(i < files.length))
                                    return [3 /*break*/, 6];
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
                                if (!showPreviews)
                                    return [3 /*break*/, 4];
                                if (!file.type.startsWith('image'))
                                    return [3 /*break*/, 3];
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
                        return [2 /*return*/, new Promise(( /**
                                 * @param {?} resolve
                                 * @param {?} reject
                                 * @return {?}
                                 */function (resolve, reject) {
                                /** @type {?} */
                                var reader = new FileReader();
                                reader.onload = ( /**
                                 * @param {?} e
                                 * @return {?}
                                 */function (e) {
                                    /** @type {?} */
                                    var preview = {
                                        data: (( /** @type {?} */(e.target))).result,
                                        filename: file.name
                                    };
                                    return resolve(preview);
                                });
                                reader.onerror = ( /**
                                 * @param {?} e
                                 * @return {?}
                                 */function (e) {
                                    console.error("FileReader failed on file " + file.name + ". No preview image created.");
                                    return reject(null);
                                });
                                reader.readAsDataURL(file);
                            }))];
                    });
                });
            };
        NgxDropzoneService.decorators = [
            { type: core.Injectable },
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
            this.filesAdded = new core.EventEmitter();
            this.filesRejected = new core.EventEmitter();
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
                this.handleFileDrop(files).then(( /**
                 * @return {?}
                 */function () {
                    // Reset the file input value to trigger the event on new selection.
                    (( /** @type {?} */(_this.fileInput.nativeElement))).value = '';
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
                        return [2 /*return*/, new Promise(( /**
                                 * @param {?} resolve
                                 * @return {?}
                                 */function (resolve) {
                                if (_this.disabled) {
                                    return;
                                }
                                _this.service.parseFileList(files, _this.accept, _this.maxFileSize, _this.multiple, _this.preserveFiles, _this.showPreviews)
                                    .then(( /**
                             * @param {?} result
                             * @return {?}
                             */function (result) {
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
            { type: core.Component, args: [{
                        selector: 'ngx-dropzone',
                        template: "<input type=\"file\" #fileInput class=\"file-input\" (change)=\"onFilesSelected($event)\" [multiple]=\"multiple\"\n  [accept]=\"accept\" />\n<div class=\"dropzone\" (click)=\"showFileSelector()\">\n  <p *ngIf=\"service.previews.length === 0\">{{ label }}</p>\n  <div class=\"preview\" [class.limit-width]=\"!p.data\" *ngFor=\"let p of service.previews\">\n    <img *ngIf=\"p.data\" [src]=\"p.data\">\n    <span *ngIf=\"p.data\">{{ p.filename }}</span>\n    <div *ngIf=\"!p.data\" class=\"preview-item\">\n      <span>{{ p.filename }}</span>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host(){display:flex;height:180px;cursor:pointer;background:#fff;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px}:host().hovered{border:2px solid #717386;color:#dfdfe4}:host().disabled{opacity:.5;cursor:no-drop}:host()>.dropzone{display:flex;flex-direction:row;justify-content:flex-start;align-items:center;width:100%;overflow-x:auto}:host()>.dropzone>p{margin:10px auto}:host()>.dropzone>.preview{height:80%;position:relative;text-align:center;padding:0 10px;width:-webkit-max-content;width:-moz-max-content;width:max-content}:host()>.dropzone>.preview.limit-width{max-width:25%}:host()>.dropzone>.preview>img{max-height:100%;border-radius:5px;opacity:.8}:host()>.dropzone>.preview>span{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}:host()>.dropzone>.preview>.preview-item{display:flex;text-align:center;align-items:center;height:100%;padding:0 40px;overflow-wrap:break-word;border-radius:5px;background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}:host()>.dropzone>.preview>.preview-item>span{color:#717386;max-width:100%}.file-input{display:none}"],
                        providers: [NgxDropzoneService] // Create a new service instance for each component.
                    },] },
        ];
        /** @nocollapse */
        NgxDropzoneComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: NgxDropzoneService }
            ];
        };
        NgxDropzoneComponent.propDecorators = {
            label: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            accept: [{ type: core.Input }],
            maxFileSize: [{ type: core.Input }],
            showPreviews: [{ type: core.Input }],
            preserveFiles: [{ type: core.Input }],
            filesAdded: [{ type: core.Output }],
            filesRejected: [{ type: core.Output }],
            disabled: [{ type: core.HostBinding, args: ['class.disabled',] }, { type: core.Input }],
            hovered: [{ type: core.HostBinding, args: ['class.hovered',] }],
            fileInput: [{ type: core.ViewChild, args: ['fileInput',] }],
            onDragOver: [{ type: core.HostListener, args: ['dragover', ['$event'],] }],
            onDragLeave: [{ type: core.HostListener, args: ['dragleave', ['$event'],] }],
            onDrop: [{ type: core.HostListener, args: ['drop', ['$event'],] }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.NgxDropzoneComponent = NgxDropzoneComponent;
    exports.NgxDropzoneModule = NgxDropzoneModule;
    exports.ɵa = NgxDropzoneService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly9uZ3gtZHJvcHpvbmUvbGliL25neC1kcm9wem9uZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZHJvcHpvbmUvbGliL25neC1kcm9wem9uZS5jb21wb25lbnQudHMiLCJuZzovL25neC1kcm9wem9uZS9saWIvbmd4LWRyb3B6b25lLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWxlUHJldmlldyB7XG4gIGRhdGE6IHN0cmluZyB8IEFycmF5QnVmZmVyO1xuICBmaWxlbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVTZWxlY3RSZXN1bHQge1xuICBhZGRlZEZpbGVzOiBGaWxlW107XG4gIHJlamVjdGVkRmlsZXM6IEZpbGVbXTtcbn1cblxuLyoqXG4gKiBVUERBVEUgMDQuMDQuMjAxOTpcbiAqIFJlZmFjdG9yZWQgdG8gdXNlIHNlcnZpY2UgY2xhc3MgdG8gaGFuZGxlIGFueVxuICogbG9naWMgb24gdGhlIGRyb3BwZWQgZmlsZXMgdG8gYWxsb3cgZm9yIGVhc2llclxuICogdW5pdCB0ZXN0cyBhbmQgc2VwYXJhdGlvbiBvZiBjb25jZXJucy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neERyb3B6b25lU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwcml2YXRlIGZpbGVDYWNoZTogRmlsZVtdID0gW107XG4gIHByaXZhdGUgcmVqZWN0ZWRGaWxlczogRmlsZVtdID0gW107XG4gIHByZXZpZXdzOiBGaWxlUHJldmlld1tdID0gW107XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5maWxlQ2FjaGUgPSBbXTtcbiAgICB0aGlzLnJlamVjdGVkRmlsZXMgPSBbXTtcbiAgICB0aGlzLnByZXZpZXdzID0gW107XG4gIH1cblxuICBhc3luYyBwYXJzZUZpbGVMaXN0KGZpbGVzOiBGaWxlTGlzdCwgYWNjZXB0OiBzdHJpbmcsIG1heEZpbGVTaXplOiBudW1iZXIsIG11bHRpcGxlOiBib29sZWFuLFxuICAgIHByZXNlcnZlRmlsZXM6IGJvb2xlYW4sIHNob3dQcmV2aWV3czogYm9vbGVhbik6IFByb21pc2U8RmlsZVNlbGVjdFJlc3VsdD4ge1xuXG4gICAgLyoqXG4gICAgICogVVBEQVRFIDI3LjAxLjIwMTk6XG4gICAgICogUmVmYWN0b3JlZCB0aGUgZmlsdGVyIGFsZ29yaXRobSBpbnRvIG9uZSBmaWx0ZXIoKSBtZXRob2QgdG8gZ2FpblxuICAgICAqIGJldHRlciBwZXJmb3JtYW5jZSBieSBpdGVyYXRpbmcgb25seSBvbmNlLlxuICAgICAqIFNlZSBpc3N1ZSAjMS5cbiAgICAgKlxuICAgICAqIFVQREFURSAwOS4wMy4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdG8gb25lIHNpbmdsZSBsb29wIGFuZCBmaXhlZCBidWcgd2hlcmUgZGlzYWJsZWQgbXVsdGlwbGVcbiAgICAgKiBzZWxlY3Rpb24gbWlnaHQgcmV0dXJuIGludmFsaWQgKHVuZmlsdGVyZWQpIGZpbGVzLlxuICAgICAqIEFkZGVkIGltYWdlIHByZXZpZXcgb3B0aW9uLlxuICAgICAqXG4gICAgICogVVBEQVRFIDEyLjAzLjIwMTk6XG4gICAgICogUmVmYWN0b3JlZCB0byB1c2UgZmlsZUNhY2hlIGFuZCBlbWl0IGFsbCBkcm9wcGVkIGZpbGVzXG4gICAgICogc2luY2UgdGhlIGxhc3QgcmVzZXQgaWYgW3ByZXNlcnZlRmlsZXNdIGlzIHRydWUuXG4gICAgICovXG4gICAgY29uc3QgaGFzRmlsZXR5cGVGaWx0ZXIgPSBhY2NlcHQgIT09ICcqJztcblxuICAgIC8qKlxuICAgICAqIFVQREFURSAxMi4wMy4yMDE5OlxuICAgICAqIEFkZGVkIG9wdGlvbiB0byBwcmVzZXJ2ZSBwcmV2aWV3IGltYWdlcy5cbiAgICAgKi9cbiAgICBpZiAoIXByZXNlcnZlRmlsZXMpIHtcbiAgICAgIHRoaXMuZmlsZUNhY2hlID0gW107XG4gICAgICB0aGlzLnJlamVjdGVkRmlsZXMgPSBbXTtcbiAgICAgIHRoaXMucHJldmlld3MgPSBbXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXMuaXRlbShpKTtcblxuICAgICAgaWYgKGhhc0ZpbGV0eXBlRmlsdGVyKSB7XG4gICAgICAgIGlmIChhY2NlcHQuZW5kc1dpdGgoJy8qJykpIHtcbiAgICAgICAgICAvLyBJZiBhIGdlbmVyaWMgZmlsZSB0eXBlIGlzIHByb3ZpZGVkLCB3ZSBjaGVjayBmb3IgYSBtYXRjaC5cbiAgICAgICAgICBpZiAoYWNjZXB0LnNwbGl0KCcvJylbMF0gIT09IGZpbGUudHlwZS5zcGxpdCgnLycpWzBdKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdGVkRmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBFbHNlIGFuIGV4YWN0IG1hdGNoIGlzIHJlcXVpcmVkLlxuICAgICAgICAgIGlmICghYWNjZXB0LmluY2x1ZGVzKGZpbGUudHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhGaWxlU2l6ZSAmJiBmaWxlLnNpemUgPiBtYXhGaWxlU2l6ZSkge1xuICAgICAgICB0aGlzLnJlamVjdGVkRmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghbXVsdGlwbGUgJiYgdGhpcy5maWxlQ2FjaGUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgaWYgKCFwcmVzZXJ2ZUZpbGVzKSB7XG4gICAgICAgICAgLy8gQWx3YXlzIGVtaXQgdGhlIGxhdGVzdCBmaWxlIGlmIG11bHRpLXNlbGVjdGlvbiBhbmQgcHJlc2VydmF0aW9uIGFyZSBkaXNhYmxlZC5cbiAgICAgICAgICB0aGlzLmZpbGVDYWNoZSA9IFtmaWxlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hvd1ByZXZpZXdzKSB7XG4gICAgICAgIGlmIChmaWxlLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UnKSkge1xuICAgICAgICAgIGNvbnN0IHByZXZpZXcgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKGZpbGUpO1xuXG4gICAgICAgICAgaWYgKHByZXZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlld3MucHVzaChwcmV2aWV3KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcHJldmlldzogRmlsZVByZXZpZXcgPSB7XG4gICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUubmFtZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB0aGlzLnByZXZpZXdzLnB1c2gocHJldmlldyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5maWxlQ2FjaGUucHVzaChmaWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQ6IEZpbGVTZWxlY3RSZXN1bHQgPSB7XG4gICAgICBhZGRlZEZpbGVzOiB0aGlzLmZpbGVDYWNoZSxcbiAgICAgIHJlamVjdGVkRmlsZXM6IHRoaXMucmVqZWN0ZWRGaWxlc1xuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZWFkRmlsZShmaWxlOiBGaWxlKTogUHJvbWlzZTxGaWxlUHJldmlldz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxGaWxlUHJldmlldz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aWV3OiBGaWxlUHJldmlldyA9IHtcbiAgICAgICAgICBkYXRhOiAoZS50YXJnZXQgYXMgRmlsZVJlYWRlcikucmVzdWx0LFxuICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLm5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmV2aWV3KTtcbiAgICAgIH07XG5cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZpbGVSZWFkZXIgZmFpbGVkIG9uIGZpbGUgJHtmaWxlLm5hbWV9LiBObyBwcmV2aWV3IGltYWdlIGNyZWF0ZWQuYCk7XG4gICAgICAgIHJldHVybiByZWplY3QobnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLFxuICBBZnRlclZpZXdJbml0LCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSG9zdExpc3RlbmVyLFxuICBIb3N0QmluZGluZ1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neERyb3B6b25lU2VydmljZSwgRmlsZVByZXZpZXcsIEZpbGVTZWxlY3RSZXN1bHQgfSBmcm9tICcuL25neC1kcm9wem9uZS5zZXJ2aWNlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICd1cmwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZHJvcHpvbmUnLFxuICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwiZmlsZVwiICNmaWxlSW5wdXQgY2xhc3M9XCJmaWxlLWlucHV0XCIgKGNoYW5nZSk9XCJvbkZpbGVzU2VsZWN0ZWQoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gIFthY2NlcHRdPVwiYWNjZXB0XCIgLz5cbjxkaXYgY2xhc3M9XCJkcm9wem9uZVwiIChjbGljayk9XCJzaG93RmlsZVNlbGVjdG9yKClcIj5cbiAgPHAgKm5nSWY9XCJzZXJ2aWNlLnByZXZpZXdzLmxlbmd0aCA9PT0gMFwiPnt7IGxhYmVsIH19PC9wPlxuICA8ZGl2IGNsYXNzPVwicHJldmlld1wiIFtjbGFzcy5saW1pdC13aWR0aF09XCIhcC5kYXRhXCIgKm5nRm9yPVwibGV0IHAgb2Ygc2VydmljZS5wcmV2aWV3c1wiPlxuICAgIDxpbWcgKm5nSWY9XCJwLmRhdGFcIiBbc3JjXT1cInAuZGF0YVwiPlxuICAgIDxzcGFuICpuZ0lmPVwicC5kYXRhXCI+e3sgcC5maWxlbmFtZSB9fTwvc3Bhbj5cbiAgICA8ZGl2ICpuZ0lmPVwiIXAuZGF0YVwiIGNsYXNzPVwicHJldmlldy1pdGVtXCI+XG4gICAgICA8c3Bhbj57eyBwLmZpbGVuYW1lIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0KCl7ZGlzcGxheTpmbGV4O2hlaWdodDoxODBweDtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6IzcxNzM4Njtib3JkZXI6MnB4IGRhc2hlZCAjNzE3Mzg2O2JvcmRlci1yYWRpdXM6NXB4O2ZvbnQtc2l6ZToxNnB4fTpob3N0KCkuaG92ZXJlZHtib3JkZXI6MnB4IHNvbGlkICM3MTczODY7Y29sb3I6I2RmZGZlNH06aG9zdCgpLmRpc2FibGVke29wYWNpdHk6LjU7Y3Vyc29yOm5vLWRyb3B9Omhvc3QoKT4uZHJvcHpvbmV7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdztqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1pdGVtczpjZW50ZXI7d2lkdGg6MTAwJTtvdmVyZmxvdy14OmF1dG99Omhvc3QoKT4uZHJvcHpvbmU+cHttYXJnaW46MTBweCBhdXRvfTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3e2hlaWdodDo4MCU7cG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzowIDEwcHg7d2lkdGg6LXdlYmtpdC1tYXgtY29udGVudDt3aWR0aDotbW96LW1heC1jb250ZW50O3dpZHRoOm1heC1jb250ZW50fTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3LmxpbWl0LXdpZHRoe21heC13aWR0aDoyNSV9Omhvc3QoKT4uZHJvcHpvbmU+LnByZXZpZXc+aW1ne21heC1oZWlnaHQ6MTAwJTtib3JkZXItcmFkaXVzOjVweDtvcGFjaXR5Oi44fTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3PnNwYW57cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7Y29sb3I6I2ZmZn06aG9zdCgpPi5kcm9wem9uZT4ucHJldmlldz4ucHJldmlldy1pdGVte2Rpc3BsYXk6ZmxleDt0ZXh0LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjEwMCU7cGFkZGluZzowIDQwcHg7b3ZlcmZsb3ctd3JhcDpicmVhay13b3JkO2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZWRlZGVkLCNlZmVmZWYsI2YxZjFmMSwjZjRmNGY0LCNmNmY2ZjYpfTpob3N0KCk+LmRyb3B6b25lPi5wcmV2aWV3Pi5wcmV2aWV3LWl0ZW0+c3Bhbntjb2xvcjojNzE3Mzg2O21heC13aWR0aDoxMDAlfS5maWxlLWlucHV0e2Rpc3BsYXk6bm9uZX1gXSxcbiAgcHJvdmlkZXJzOiBbTmd4RHJvcHpvbmVTZXJ2aWNlXSAvLyBDcmVhdGUgYSBuZXcgc2VydmljZSBpbnN0YW5jZSBmb3IgZWFjaCBjb21wb25lbnQuXG59KVxuZXhwb3J0IGNsYXNzIE5neERyb3B6b25lQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHNlcnZpY2U6IE5neERyb3B6b25lU2VydmljZVxuICApIHsgfVxuXG4gIEBJbnB1dCgpIGxhYmVsID0gJ0Ryb3AgeW91ciBmaWxlcyBoZXJlIChvciBjbGljayknO1xuICBASW5wdXQoKSBtdWx0aXBsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGFjY2VwdCA9ICcqJztcbiAgQElucHV0KCkgbWF4RmlsZVNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgc2hvd1ByZXZpZXdzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHByZXNlcnZlRmlsZXMgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBmaWxlc0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG4gIEBPdXRwdXQoKSBmaWxlc1JlamVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuaG92ZXJlZCcpIGhvdmVyZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnKSBwcml2YXRlIGZpbGVJbnB1dDogRWxlbWVudFJlZjtcblxuICBzaG93RmlsZVNlbGVjdG9yKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2VydmljZS5yZXNldCgpO1xuICB9XG5cbiAgb25GaWxlc1NlbGVjdGVkKGV2ZW50KSB7XG4gICAgY29uc3QgZmlsZXM6IEZpbGVMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuXG4gICAgdGhpcy5oYW5kbGVGaWxlRHJvcChmaWxlcykudGhlbigoKSA9PiB7XG4gICAgICAvLyBSZXNldCB0aGUgZmlsZSBpbnB1dCB2YWx1ZSB0byB0cmlnZ2VyIHRoZSBldmVudCBvbiBuZXcgc2VsZWN0aW9uLlxuICAgICAgKHRoaXMuZmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVUERBVEUgMTAuMDMuMjAxOTpcbiAgICogUmVmYWN0b3JlZCB0byB1c2UgSG9zdExpc3RlbmVyIGFuZCBIb3N0QmluZGluZ3MgdG8gYWxsb3dcbiAgICogZm9yIGVhc2llciBzdHlsZSBvdmVyd3JpdGluZyBmcm9tIG91dHNpZGUgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgb25EcmFnT3ZlcihldmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgdGhpcy5ob3ZlcmVkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgb25Ecm9wKGV2ZW50KSB7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdChldmVudCk7XG4gICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVGaWxlRHJvcChldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVGaWxlRHJvcChmaWxlczogRmlsZUxpc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VydmljZS5wYXJzZUZpbGVMaXN0KGZpbGVzLCB0aGlzLmFjY2VwdCwgdGhpcy5tYXhGaWxlU2l6ZSxcbiAgICAgICAgdGhpcy5tdWx0aXBsZSwgdGhpcy5wcmVzZXJ2ZUZpbGVzLCB0aGlzLnNob3dQcmV2aWV3cylcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogRmlsZVNlbGVjdFJlc3VsdCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmlsZXNBZGRlZC5uZXh0KHJlc3VsdC5hZGRlZEZpbGVzKTtcblxuICAgICAgICAgIGlmIChyZXN1bHQucmVqZWN0ZWRGaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZXNSZWplY3RlZC5uZXh0KHJlc3VsdC5yZWplY3RlZEZpbGVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2ZW50RGVmYXVsdChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neERyb3B6b25lQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZHJvcHpvbmUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4RHJvcHpvbmVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neERyb3B6b25lQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4RHJvcHpvbmVNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIkhvc3RCaW5kaW5nIiwiVmlld0NoaWxkIiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLGFBbURnQixTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUztRQUN2RCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3JELFNBQVMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJO2dCQUFFLElB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