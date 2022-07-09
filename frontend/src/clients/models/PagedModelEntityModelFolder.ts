/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityModelFolder } from './EntityModelFolder';
import type { Links } from './Links';
import type { PageMetadata } from './PageMetadata';

export type PagedModelEntityModelFolder = {
    _embedded?: {
        folders?: Array<EntityModelFolder>;
    };
    _links?: Links;
    page?: PageMetadata;
};

