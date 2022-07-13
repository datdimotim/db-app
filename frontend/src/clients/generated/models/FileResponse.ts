/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Folder } from './Folder';

export type FileResponse = {
    id?: string;
    name?: string;
    created?: string;
    summary?: string;
    contentId?: string;
    contentLength?: number;
    contentMimeType?: string;
    parent?: Folder;
};

