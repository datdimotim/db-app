/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { Folder } from './Folder';

export type FolderResponse = {
    id?: string;
    name?: string;
    created?: string;
    summary?: string;
    parent?: Folder;
    childs?: Array<Folder>;
    files?: Array<File>;
};

