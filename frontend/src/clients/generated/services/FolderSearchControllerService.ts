/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionModelEntityModelFolder } from '../models/CollectionModelEntityModelFolder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FolderSearchControllerService {

    /**
     * @param name
     * @returns CollectionModelEntityModelFolder OK
     * @throws ApiError
     */
    public static executeSearchFolderGet(
        name?: string,
    ): CancelablePromise<CollectionModelEntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/folders/search/findAllByNameLike',
            query: {
                'name': name,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
