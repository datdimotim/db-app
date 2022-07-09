/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FolderResponse } from './FolderResponse';
import type { Links } from './Links';

export type CollectionModelFolder = {
    _embedded?: {
        folders?: Array<FolderResponse>;
    };
    _links?: Links;
};

