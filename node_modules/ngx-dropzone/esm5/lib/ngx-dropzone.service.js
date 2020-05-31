/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function FilePreview() { }
if (false) {
    /** @type {?} */
    FilePreview.prototype.data;
    /** @type {?} */
    FilePreview.prototype.filename;
}
/**
 * @record
 */
export function FileSelectResult() { }
if (false) {
    /** @type {?} */
    FileSelectResult.prototype.addedFiles;
    /** @type {?} */
    FileSelectResult.prototype.rejectedFiles;
}
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var hasFiletypeFilter, i, file, preview, preview, result;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
export { NgxDropzoneService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxDropzoneService.prototype.fileCache;
    /**
     * @type {?}
     * @private
     */
    NgxDropzoneService.prototype.rejectedFiles;
    /** @type {?} */
    NgxDropzoneService.prototype.previews;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJvcHpvbmUvIiwic291cmNlcyI6WyJsaWIvbmd4LWRyb3B6b25lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRTNDLGlDQUdDOzs7SUFGQywyQkFBMkI7O0lBQzNCLCtCQUFpQjs7Ozs7QUFHbkIsc0NBR0M7OztJQUZDLHNDQUFtQjs7SUFDbkIseUNBQXNCOzs7Ozs7OztBQVN4QjtJQUdFO1FBRVEsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUNuQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztJQUpiLENBQUM7Ozs7SUFNakIsa0NBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7OztJQUVLLDBDQUFhOzs7Ozs7Ozs7SUFBbkIsVUFBb0IsS0FBZSxFQUFFLE1BQWMsRUFBRSxXQUFtQixFQUFFLFFBQWlCLEVBQ3pGLGFBQXNCLEVBQUUsWUFBcUI7Ozs7Ozt3QkFpQnZDLGlCQUFpQixHQUFHLE1BQU0sS0FBSyxHQUFHO3dCQUV4Qzs7OzJCQUdHO3dCQUNILElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOzRCQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7eUJBQ3BCO3dCQUVRLENBQUMsR0FBRyxDQUFDOzs7NkJBQUUsQ0FBQSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQTt3QkFDeEIsSUFBSSxH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QyxDQUFDOzRCQUNuRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFBLENBQUE7d0JBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxFQUFDLEVBQUE7OztLQUNIOztnQkE5SEYsVUFBVTs7OztJQStIWCx5QkFBQztDQUFBLEFBL0hELElBK0hDO1NBOUhZLGtCQUFrQjs7Ozs7O0lBSTdCLHVDQUErQjs7Ozs7SUFDL0IsMkNBQW1DOztJQUNuQyxzQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVByZXZpZXcge1xuICBkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlcjtcbiAgZmlsZW5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlU2VsZWN0UmVzdWx0IHtcbiAgYWRkZWRGaWxlczogRmlsZVtdO1xuICByZWplY3RlZEZpbGVzOiBGaWxlW107XG59XG5cbi8qKlxuICogVVBEQVRFIDA0LjA0LjIwMTk6XG4gKiBSZWZhY3RvcmVkIHRvIHVzZSBzZXJ2aWNlIGNsYXNzIHRvIGhhbmRsZSBhbnlcbiAqIGxvZ2ljIG9uIHRoZSBkcm9wcGVkIGZpbGVzIHRvIGFsbG93IGZvciBlYXNpZXJcbiAqIHVuaXQgdGVzdHMgYW5kIHNlcGFyYXRpb24gb2YgY29uY2VybnMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hEcm9wem9uZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHJpdmF0ZSBmaWxlQ2FjaGU6IEZpbGVbXSA9IFtdO1xuICBwcml2YXRlIHJlamVjdGVkRmlsZXM6IEZpbGVbXSA9IFtdO1xuICBwcmV2aWV3czogRmlsZVByZXZpZXdbXSA9IFtdO1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZmlsZUNhY2hlID0gW107XG4gICAgdGhpcy5yZWplY3RlZEZpbGVzID0gW107XG4gICAgdGhpcy5wcmV2aWV3cyA9IFtdO1xuICB9XG5cbiAgYXN5bmMgcGFyc2VGaWxlTGlzdChmaWxlczogRmlsZUxpc3QsIGFjY2VwdDogc3RyaW5nLCBtYXhGaWxlU2l6ZTogbnVtYmVyLCBtdWx0aXBsZTogYm9vbGVhbixcbiAgICBwcmVzZXJ2ZUZpbGVzOiBib29sZWFuLCBzaG93UHJldmlld3M6IGJvb2xlYW4pOiBQcm9taXNlPEZpbGVTZWxlY3RSZXN1bHQ+IHtcblxuICAgIC8qKlxuICAgICAqIFVQREFURSAyNy4wMS4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdGhlIGZpbHRlciBhbGdvcml0aG0gaW50byBvbmUgZmlsdGVyKCkgbWV0aG9kIHRvIGdhaW5cbiAgICAgKiBiZXR0ZXIgcGVyZm9ybWFuY2UgYnkgaXRlcmF0aW5nIG9ubHkgb25jZS5cbiAgICAgKiBTZWUgaXNzdWUgIzEuXG4gICAgICpcbiAgICAgKiBVUERBVEUgMDkuMDMuMjAxOTpcbiAgICAgKiBSZWZhY3RvcmVkIHRvIG9uZSBzaW5nbGUgbG9vcCBhbmQgZml4ZWQgYnVnIHdoZXJlIGRpc2FibGVkIG11bHRpcGxlXG4gICAgICogc2VsZWN0aW9uIG1pZ2h0IHJldHVybiBpbnZhbGlkICh1bmZpbHRlcmVkKSBmaWxlcy5cbiAgICAgKiBBZGRlZCBpbWFnZSBwcmV2aWV3IG9wdGlvbi5cbiAgICAgKlxuICAgICAqIFVQREFURSAxMi4wMy4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdG8gdXNlIGZpbGVDYWNoZSBhbmQgZW1pdCBhbGwgZHJvcHBlZCBmaWxlc1xuICAgICAqIHNpbmNlIHRoZSBsYXN0IHJlc2V0IGlmIFtwcmVzZXJ2ZUZpbGVzXSBpcyB0cnVlLlxuICAgICAqL1xuICAgIGNvbnN0IGhhc0ZpbGV0eXBlRmlsdGVyID0gYWNjZXB0ICE9PSAnKic7XG5cbiAgICAvKipcbiAgICAgKiBVUERBVEUgMTIuMDMuMjAxOTpcbiAgICAgKiBBZGRlZCBvcHRpb24gdG8gcHJlc2VydmUgcHJldmlldyBpbWFnZXMuXG4gICAgICovXG4gICAgaWYgKCFwcmVzZXJ2ZUZpbGVzKSB7XG4gICAgICB0aGlzLmZpbGVDYWNoZSA9IFtdO1xuICAgICAgdGhpcy5yZWplY3RlZEZpbGVzID0gW107XG4gICAgICB0aGlzLnByZXZpZXdzID0gW107XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oaSk7XG5cbiAgICAgIGlmIChoYXNGaWxldHlwZUZpbHRlcikge1xuICAgICAgICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcvKicpKSB7XG4gICAgICAgICAgLy8gSWYgYSBnZW5lcmljIGZpbGUgdHlwZSBpcyBwcm92aWRlZCwgd2UgY2hlY2sgZm9yIGEgbWF0Y2guXG4gICAgICAgICAgaWYgKGFjY2VwdC5zcGxpdCgnLycpWzBdICE9PSBmaWxlLnR5cGUuc3BsaXQoJy8nKVswXSkge1xuICAgICAgICAgICAgdGhpcy5yZWplY3RlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRWxzZSBhbiBleGFjdCBtYXRjaCBpcyByZXF1aXJlZC5cbiAgICAgICAgICBpZiAoIWFjY2VwdC5pbmNsdWRlcyhmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdGVkRmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWF4RmlsZVNpemUgJiYgZmlsZS5zaXplID4gbWF4RmlsZVNpemUpIHtcbiAgICAgICAgdGhpcy5yZWplY3RlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW11bHRpcGxlICYmIHRoaXMuZmlsZUNhY2hlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGlmICghcHJlc2VydmVGaWxlcykge1xuICAgICAgICAgIC8vIEFsd2F5cyBlbWl0IHRoZSBsYXRlc3QgZmlsZSBpZiBtdWx0aS1zZWxlY3Rpb24gYW5kIHByZXNlcnZhdGlvbiBhcmUgZGlzYWJsZWQuXG4gICAgICAgICAgdGhpcy5maWxlQ2FjaGUgPSBbZmlsZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dQcmV2aWV3cykge1xuICAgICAgICBpZiAoZmlsZS50eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlJykpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aWV3ID0gYXdhaXQgdGhpcy5yZWFkRmlsZShmaWxlKTtcblxuICAgICAgICAgIGlmIChwcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdzLnB1c2gocHJldmlldyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHByZXZpZXc6IEZpbGVQcmV2aWV3ID0ge1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLm5hbWVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5wcmV2aWV3cy5wdXNoKHByZXZpZXcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlsZUNhY2hlLnB1c2goZmlsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBGaWxlU2VsZWN0UmVzdWx0ID0ge1xuICAgICAgYWRkZWRGaWxlczogdGhpcy5maWxlQ2FjaGUsXG4gICAgICByZWplY3RlZEZpbGVzOiB0aGlzLnJlamVjdGVkRmlsZXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVhZEZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8RmlsZVByZXZpZXc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8RmlsZVByZXZpZXc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5vbmxvYWQgPSBlID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlldzogRmlsZVByZXZpZXcgPSB7XG4gICAgICAgICAgZGF0YTogKGUudGFyZ2V0IGFzIEZpbGVSZWFkZXIpLnJlc3VsdCxcbiAgICAgICAgICBmaWxlbmFtZTogZmlsZS5uYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJlc29sdmUocHJldmlldyk7XG4gICAgICB9O1xuXG4gICAgICByZWFkZXIub25lcnJvciA9IGUgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlUmVhZGVyIGZhaWxlZCBvbiBmaWxlICR7ZmlsZS5uYW1lfS4gTm8gcHJldmlldyBpbWFnZSBjcmVhdGVkLmApO1xuICAgICAgICByZXR1cm4gcmVqZWN0KG51bGwpO1xuICAgICAgfVxuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KVxuICB9XG59XG4iXX0=