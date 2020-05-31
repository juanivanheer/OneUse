export interface FilePreview {
    data: string | ArrayBuffer;
    filename: string;
}
export interface FileSelectResult {
    addedFiles: File[];
    rejectedFiles: File[];
}
/**
 * UPDATE 04.04.2019:
 * Refactored to use service class to handle any
 * logic on the dropped files to allow for easier
 * unit tests and separation of concerns.
 */
export declare class NgxDropzoneService {
    constructor();
    private fileCache;
    private rejectedFiles;
    previews: FilePreview[];
    reset(): void;
    parseFileList(files: FileList, accept: string, maxFileSize: number, multiple: boolean, preserveFiles: boolean, showPreviews: boolean): Promise<FileSelectResult>;
    private readFile;
}
