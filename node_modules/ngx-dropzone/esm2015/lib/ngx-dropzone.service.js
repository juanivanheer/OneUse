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
export class NgxDropzoneService {
    constructor() {
        this.fileCache = [];
        this.rejectedFiles = [];
        this.previews = [];
    }
    /**
     * @return {?}
     */
    reset() {
        this.fileCache = [];
        this.rejectedFiles = [];
        this.previews = [];
    }
    /**
     * @param {?} files
     * @param {?} accept
     * @param {?} maxFileSize
     * @param {?} multiple
     * @param {?} preserveFiles
     * @param {?} showPreviews
     * @return {?}
     */
    parseFileList(files, accept, maxFileSize, multiple, preserveFiles, showPreviews) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /**
             * UPDATE 27.01.2019:
             * Refactored the filter algorithm into one filter() method to gain
             * better performance by iterating only once.
             * See issue #1.
             *
             * UPDATE 09.03.2019:
             * Refactored to one single loop and fixed bug where disabled multiple
             * selection might return invalid (unfiltered) files.
             * Added image preview option.
             *
             * UPDATE 12.03.2019:
             * Refactored to use fileCache and emit all dropped files
             * since the last reset if [preserveFiles] is true.
             * @type {?}
             */
            const hasFiletypeFilter = accept !== '*';
            /**
             * UPDATE 12.03.2019:
             * Added option to preserve preview images.
             */
            if (!preserveFiles) {
                this.fileCache = [];
                this.rejectedFiles = [];
                this.previews = [];
            }
            for (let i = 0; i < files.length; i++) {
                /** @type {?} */
                const file = files.item(i);
                if (hasFiletypeFilter) {
                    if (accept.endsWith('/*')) {
                        // If a generic file type is provided, we check for a match.
                        if (accept.split('/')[0] !== file.type.split('/')[0]) {
                            this.rejectedFiles.push(file);
                            continue;
                        }
                    }
                    else {
                        // Else an exact match is required.
                        if (!accept.includes(file.type)) {
                            this.rejectedFiles.push(file);
                            continue;
                        }
                    }
                }
                if (maxFileSize && file.size > maxFileSize) {
                    this.rejectedFiles.push(file);
                    continue;
                }
                if (!multiple && this.fileCache.length >= 1) {
                    if (!preserveFiles) {
                        // Always emit the latest file if multi-selection and preservation are disabled.
                        this.fileCache = [file];
                    }
                    else {
                        continue;
                    }
                }
                if (showPreviews) {
                    if (file.type.startsWith('image')) {
                        /** @type {?} */
                        const preview = yield this.readFile(file);
                        if (preview) {
                            this.previews.push(preview);
                        }
                    }
                    else {
                        /** @type {?} */
                        const preview = {
                            data: null,
                            filename: file.name
                        };
                        this.previews.push(preview);
                    }
                }
                this.fileCache.push(file);
            }
            /** @type {?} */
            const result = {
                addedFiles: this.fileCache,
                rejectedFiles: this.rejectedFiles
            };
            return result;
        });
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    readFile(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                const reader = new FileReader();
                reader.onload = (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    /** @type {?} */
                    const preview = {
                        data: ((/** @type {?} */ (e.target))).result,
                        filename: file.name
                    };
                    return resolve(preview);
                });
                reader.onerror = (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    console.error(`FileReader failed on file ${file.name}. No preview image created.`);
                    return reject(null);
                });
                reader.readAsDataURL(file);
            }));
        });
    }
}
NgxDropzoneService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgxDropzoneService.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3B6b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJvcHpvbmUvIiwic291cmNlcyI6WyJsaWIvbmd4LWRyb3B6b25lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRTNDLGlDQUdDOzs7SUFGQywyQkFBMkI7O0lBQzNCLCtCQUFpQjs7Ozs7QUFHbkIsc0NBR0M7OztJQUZDLHNDQUFtQjs7SUFDbkIseUNBQXNCOzs7Ozs7OztBQVV4QixNQUFNLE9BQU8sa0JBQWtCO0lBRTdCO1FBRVEsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUNuQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztJQUpiLENBQUM7Ozs7SUFNakIsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7Ozs7SUFFSyxhQUFhLENBQUMsS0FBZSxFQUFFLE1BQWMsRUFBRSxXQUFtQixFQUFFLFFBQWlCLEVBQ3pGLGFBQXNCLEVBQUUsWUFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFpQnZDLGlCQUFpQixHQUFHLE1BQU0sS0FBSyxHQUFHO1lBRXhDOzs7ZUFHRztZQUNILElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDcEI7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUs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Q0FBQyxDQUFDO29CQUNuRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFBLENBQUE7Z0JBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLEVBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTs7O1lBOUhGLFVBQVU7Ozs7Ozs7OztJQUtULHVDQUErQjs7Ozs7SUFDL0IsMkNBQW1DOztJQUNuQyxzQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVByZXZpZXcge1xuICBkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlcjtcbiAgZmlsZW5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlU2VsZWN0UmVzdWx0IHtcbiAgYWRkZWRGaWxlczogRmlsZVtdO1xuICByZWplY3RlZEZpbGVzOiBGaWxlW107XG59XG5cbi8qKlxuICogVVBEQVRFIDA0LjA0LjIwMTk6XG4gKiBSZWZhY3RvcmVkIHRvIHVzZSBzZXJ2aWNlIGNsYXNzIHRvIGhhbmRsZSBhbnlcbiAqIGxvZ2ljIG9uIHRoZSBkcm9wcGVkIGZpbGVzIHRvIGFsbG93IGZvciBlYXNpZXJcbiAqIHVuaXQgdGVzdHMgYW5kIHNlcGFyYXRpb24gb2YgY29uY2VybnMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hEcm9wem9uZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHJpdmF0ZSBmaWxlQ2FjaGU6IEZpbGVbXSA9IFtdO1xuICBwcml2YXRlIHJlamVjdGVkRmlsZXM6IEZpbGVbXSA9IFtdO1xuICBwcmV2aWV3czogRmlsZVByZXZpZXdbXSA9IFtdO1xuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZmlsZUNhY2hlID0gW107XG4gICAgdGhpcy5yZWplY3RlZEZpbGVzID0gW107XG4gICAgdGhpcy5wcmV2aWV3cyA9IFtdO1xuICB9XG5cbiAgYXN5bmMgcGFyc2VGaWxlTGlzdChmaWxlczogRmlsZUxpc3QsIGFjY2VwdDogc3RyaW5nLCBtYXhGaWxlU2l6ZTogbnVtYmVyLCBtdWx0aXBsZTogYm9vbGVhbixcbiAgICBwcmVzZXJ2ZUZpbGVzOiBib29sZWFuLCBzaG93UHJldmlld3M6IGJvb2xlYW4pOiBQcm9taXNlPEZpbGVTZWxlY3RSZXN1bHQ+IHtcblxuICAgIC8qKlxuICAgICAqIFVQREFURSAyNy4wMS4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdGhlIGZpbHRlciBhbGdvcml0aG0gaW50byBvbmUgZmlsdGVyKCkgbWV0aG9kIHRvIGdhaW5cbiAgICAgKiBiZXR0ZXIgcGVyZm9ybWFuY2UgYnkgaXRlcmF0aW5nIG9ubHkgb25jZS5cbiAgICAgKiBTZWUgaXNzdWUgIzEuXG4gICAgICpcbiAgICAgKiBVUERBVEUgMDkuMDMuMjAxOTpcbiAgICAgKiBSZWZhY3RvcmVkIHRvIG9uZSBzaW5nbGUgbG9vcCBhbmQgZml4ZWQgYnVnIHdoZXJlIGRpc2FibGVkIG11bHRpcGxlXG4gICAgICogc2VsZWN0aW9uIG1pZ2h0IHJldHVybiBpbnZhbGlkICh1bmZpbHRlcmVkKSBmaWxlcy5cbiAgICAgKiBBZGRlZCBpbWFnZSBwcmV2aWV3IG9wdGlvbi5cbiAgICAgKlxuICAgICAqIFVQREFURSAxMi4wMy4yMDE5OlxuICAgICAqIFJlZmFjdG9yZWQgdG8gdXNlIGZpbGVDYWNoZSBhbmQgZW1pdCBhbGwgZHJvcHBlZCBmaWxlc1xuICAgICAqIHNpbmNlIHRoZSBsYXN0IHJlc2V0IGlmIFtwcmVzZXJ2ZUZpbGVzXSBpcyB0cnVlLlxuICAgICAqL1xuICAgIGNvbnN0IGhhc0ZpbGV0eXBlRmlsdGVyID0gYWNjZXB0ICE9PSAnKic7XG5cbiAgICAvKipcbiAgICAgKiBVUERBVEUgMTIuMDMuMjAxOTpcbiAgICAgKiBBZGRlZCBvcHRpb24gdG8gcHJlc2VydmUgcHJldmlldyBpbWFnZXMuXG4gICAgICovXG4gICAgaWYgKCFwcmVzZXJ2ZUZpbGVzKSB7XG4gICAgICB0aGlzLmZpbGVDYWNoZSA9IFtdO1xuICAgICAgdGhpcy5yZWplY3RlZEZpbGVzID0gW107XG4gICAgICB0aGlzLnByZXZpZXdzID0gW107XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oaSk7XG5cbiAgICAgIGlmIChoYXNGaWxldHlwZUZpbHRlcikge1xuICAgICAgICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcvKicpKSB7XG4gICAgICAgICAgLy8gSWYgYSBnZW5lcmljIGZpbGUgdHlwZSBpcyBwcm92aWRlZCwgd2UgY2hlY2sgZm9yIGEgbWF0Y2guXG4gICAgICAgICAgaWYgKGFjY2VwdC5zcGxpdCgnLycpWzBdICE9PSBmaWxlLnR5cGUuc3BsaXQoJy8nKVswXSkge1xuICAgICAgICAgICAgdGhpcy5yZWplY3RlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRWxzZSBhbiBleGFjdCBtYXRjaCBpcyByZXF1aXJlZC5cbiAgICAgICAgICBpZiAoIWFjY2VwdC5pbmNsdWRlcyhmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdGVkRmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWF4RmlsZVNpemUgJiYgZmlsZS5zaXplID4gbWF4RmlsZVNpemUpIHtcbiAgICAgICAgdGhpcy5yZWplY3RlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW11bHRpcGxlICYmIHRoaXMuZmlsZUNhY2hlLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGlmICghcHJlc2VydmVGaWxlcykge1xuICAgICAgICAgIC8vIEFsd2F5cyBlbWl0IHRoZSBsYXRlc3QgZmlsZSBpZiBtdWx0aS1zZWxlY3Rpb24gYW5kIHByZXNlcnZhdGlvbiBhcmUgZGlzYWJsZWQuXG4gICAgICAgICAgdGhpcy5maWxlQ2FjaGUgPSBbZmlsZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dQcmV2aWV3cykge1xuICAgICAgICBpZiAoZmlsZS50eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlJykpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aWV3ID0gYXdhaXQgdGhpcy5yZWFkRmlsZShmaWxlKTtcblxuICAgICAgICAgIGlmIChwcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdzLnB1c2gocHJldmlldyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHByZXZpZXc6IEZpbGVQcmV2aWV3ID0ge1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLm5hbWVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5wcmV2aWV3cy5wdXNoKHByZXZpZXcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlsZUNhY2hlLnB1c2goZmlsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBGaWxlU2VsZWN0UmVzdWx0ID0ge1xuICAgICAgYWRkZWRGaWxlczogdGhpcy5maWxlQ2FjaGUsXG4gICAgICByZWplY3RlZEZpbGVzOiB0aGlzLnJlamVjdGVkRmlsZXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVhZEZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8RmlsZVByZXZpZXc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8RmlsZVByZXZpZXc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5vbmxvYWQgPSBlID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlldzogRmlsZVByZXZpZXcgPSB7XG4gICAgICAgICAgZGF0YTogKGUudGFyZ2V0IGFzIEZpbGVSZWFkZXIpLnJlc3VsdCxcbiAgICAgICAgICBmaWxlbmFtZTogZmlsZS5uYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJlc29sdmUocHJldmlldyk7XG4gICAgICB9O1xuXG4gICAgICByZWFkZXIub25lcnJvciA9IGUgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlUmVhZGVyIGZhaWxlZCBvbiBmaWxlICR7ZmlsZS5uYW1lfS4gTm8gcHJldmlldyBpbWFnZSBjcmVhdGVkLmApO1xuICAgICAgICByZXR1cm4gcmVqZWN0KG51bGwpO1xuICAgICAgfVxuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KVxuICB9XG59XG4iXX0=