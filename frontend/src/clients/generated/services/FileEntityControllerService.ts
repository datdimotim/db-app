/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EntityModelFile } from '../models/EntityModelFile';
import type { FileRequestBody } from '../models/FileRequestBody';
import type { PagedModelEntityModelFile } from '../models/PagedModelEntityModelFile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileEntityControllerService {

    /**
     * get-file
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @returns PagedModelEntityModelFile OK
     * @throws ApiError
     */
    public static getCollectionResourceFileGet1(
        page?: number,
        size: number = 20,
        sort?: Array<string>,
    ): CancelablePromise<PagedModelEntityModelFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/files',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
            },
        });
    }

    /**
     * create-file
     * @param requestBody
     * @returns EntityModelFile Created
     * @throws ApiError
     */
    public static postCollectionResourceFilePost(
        requestBody: FileRequestBody,
    ): CancelablePromise<EntityModelFile> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/files',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-file
     * @param id
     * @returns EntityModelFile OK
     * @throws ApiError
     */
    public static getItemResourceFileGet(
        id: string,
    ): CancelablePromise<EntityModelFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-file
     * @param id
     * @param requestBody
     * @returns EntityModelFile OK
     * @throws ApiError
     */
    public static putItemResourceFilePut(
        id: string,
        requestBody: FileRequestBody,
    ): CancelablePromise<EntityModelFile> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/files/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-file
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteItemResourceFileDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-file
     * @param id
     * @param requestBody
     * @returns EntityModelFile OK
     * @throws ApiError
     */
    public static patchItemResourceFilePatch(
        id: string,
        requestBody: FileRequestBody,
    ): CancelablePromise<EntityModelFile> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/files/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
