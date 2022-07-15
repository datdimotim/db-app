/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionModelEntityModelFile } from '../models/CollectionModelEntityModelFile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileSearchControllerService {

    /**
     * @returns CollectionModelEntityModelFile OK
     * @throws ApiError
     */
    public static executeSearchFileGet(): CancelablePromise<CollectionModelEntityModelFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/files/search/findAllByParentIdIsNull',
            errors: {
                404: `Not Found`,
            },
        });
    }

}
