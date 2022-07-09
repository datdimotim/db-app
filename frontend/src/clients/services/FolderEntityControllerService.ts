/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EntityModelFolder } from '../models/EntityModelFolder';
import type { FolderRequestBody } from '../models/FolderRequestBody';
import type { PagedModelEntityModelFolder } from '../models/PagedModelEntityModelFolder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FolderEntityControllerService {

    /**
     * get-folder
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PagedModelEntityModelFolder OK
     * @throws ApiError
     */
    public static getCollectionResourceFolderGet1(
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<PagedModelEntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * create-folder
     * @param requestBody
     * @returns EntityModelFolder Created
     * @throws ApiError
     */
    public static postCollectionResourceFolderPost(
        requestBody: FolderRequestBody,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/folders',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-folder
     * @param id
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static getItemResourceFolderGet(
        id: string,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-folder
     * @param id
     * @param requestBody
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static putItemResourceFolderPut(
        id: string,
        requestBody: FolderRequestBody,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/folders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-folder
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteItemResourceFolderDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-folder
     * @param id
     * @param requestBody
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static patchItemResourceFolderPatch(
        id: string,
        requestBody: FolderRequestBody,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/folders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
