/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionModelObject } from '../models/CollectionModelObject';
import type { EntityModelFolder } from '../models/EntityModelFolder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FilePropertyReferenceControllerService {

    /**
     * get-folder-by-file-Id
     * @param id
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static followPropertyReferenceFileGet1(
        id: string,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/{id}/parent',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-folder-by-file-Id
     * @param id
     * @param requestBody
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static createPropertyReferenceFilePut(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/files/{id}/parent',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-folder-by-file-Id
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceFileDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/files/{id}/parent',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-folder-by-file-Id
     * @param id
     * @param requestBody
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static createPropertyReferenceFilePatch(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/files/{id}/parent',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-folder-by-file-Id
     * @param id
     * @param propertyId
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static followPropertyReferenceFileGet(
        id: string,
        propertyId: string,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/files/{id}/parent/{propertyId}',
            path: {
                'id': id,
                'propertyId': propertyId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * delete-folder-by-file-Id
     * @param id
     * @param propertyId
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceIdFileDelete(
        id: string,
        propertyId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/files/{id}/parent/{propertyId}',
            path: {
                'id': id,
                'propertyId': propertyId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
