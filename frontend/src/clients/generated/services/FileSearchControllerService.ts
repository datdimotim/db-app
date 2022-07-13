/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionModelEntityModelFile } from '../models/CollectionModelEntityModelFile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileSearchControllerService {

    /**
     * @param name
     * @returns CollectionModelEntityModelFile OK
     * @throws ApiError
     */
    public static executeSearchFileGet(
        name?: string,
    ): CancelablePromise<CollectionModelEntityModelFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/files/search/findAllByNameLike',
            query: {
                'name': name,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
