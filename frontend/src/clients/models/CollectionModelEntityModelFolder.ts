/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EntityModelFolder } from './EntityModelFolder';
import type { Links } from './Links';

export type CollectionModelEntityModelFolder = {
    _embedded?: {
        folders?: Array<EntityModelFolder>;
    };
    _links?: Links;
};

