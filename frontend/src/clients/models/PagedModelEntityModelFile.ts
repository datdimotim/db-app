/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityModelFile } from './EntityModelFile';
import type { Links } from './Links';
import type { PageMetadata } from './PageMetadata';

export type PagedModelEntityModelFile = {
    _embedded?: {
        files?: Array<EntityModelFile>;
    };
    _links?: Links;
    page?: PageMetadata;
};

