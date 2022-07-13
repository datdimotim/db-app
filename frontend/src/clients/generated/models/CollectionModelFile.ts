/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileResponse } from './FileResponse';
import type { Links } from './Links';

export type CollectionModelFile = {
    _embedded?: {
        files?: Array<FileResponse>;
    };
    _links?: Links;
};

