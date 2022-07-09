/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Folder } from './Folder';
import type { Links } from './Links';

export type EntityModelFile = {
    id?: string;
    name?: string;
    created?: string;
    summary?: string;
    contentId?: string;
    contentLength?: number;
    contentMimeType?: string;
    parent?: Folder;
    _links?: Links;
};

