/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';

export type Folder = {
    id?: string;
    name?: string;
    created?: string;
    summary?: string;
    parent?: Folder;
    childs?: Array<Folder>;
    files?: Array<File>;
};

