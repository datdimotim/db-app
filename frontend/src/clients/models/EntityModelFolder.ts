/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { Folder } from './Folder';
import type { Links } from './Links';

export type EntityModelFolder = {
    id?: string;
    name?: string;
    created?: string;
    summary?: string;
    parent?: Folder;
    childs?: Array<Folder>;
    files?: Array<File>;
    _links?: Links;
};

