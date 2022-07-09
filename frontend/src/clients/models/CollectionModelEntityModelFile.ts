/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityModelFile } from './EntityModelFile';
import type { Links } from './Links';

export type CollectionModelEntityModelFile = {
    _embedded?: {
        files?: Array<EntityModelFile>;
    };
    _links?: Links;
};

