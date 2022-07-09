/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionModelFile } from '../models/CollectionModelFile';
import type { CollectionModelFolder } from '../models/CollectionModelFolder';
import type { CollectionModelObject } from '../models/CollectionModelObject';
import type { EntityModelFolder } from '../models/EntityModelFolder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FolderPropertyReferenceControllerService {

    /**
     * get-folder-by-folder-Id
     * @param id
     * @returns CollectionModelFolder OK
     * @throws ApiError
     */
    public static followPropertyReferenceFolderGet1(
        id: string,
    ): CancelablePromise<CollectionModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}/childs',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-folder-by-folder-Id
     * @param id
     * @param requestBody
     * @returns CollectionModelFolder OK
     * @throws ApiError
     */
    public static createPropertyReferenceFolderPut(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<CollectionModelFolder> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/folders/{id}/childs',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-folder-by-folder-Id
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceFolderDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}/childs',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-folder-by-folder-Id
     * @param id
     * @param requestBody
     * @returns CollectionModelFolder OK
     * @throws ApiError
     */
    public static createPropertyReferenceFolderPatch(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<CollectionModelFolder> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/folders/{id}/childs',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-folder-by-folder-Id
     * @param id
     * @param propertyId
     * @returns CollectionModelFolder OK
     * @throws ApiError
     */
    public static followPropertyReferenceFolderGet(
        id: string,
        propertyId: string,
    ): CancelablePromise<CollectionModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}/childs/{propertyId}',
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
     * delete-folder-by-folder-Id
     * @param id
     * @param propertyId
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceIdFolderDelete(
        id: string,
        propertyId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}/childs/{propertyId}',
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
     * get-file-by-folder-Id
     * @param id
     * @returns CollectionModelFile OK
     * @throws ApiError
     */
    public static followPropertyReferenceFolderGet21(
        id: string,
    ): CancelablePromise<CollectionModelFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}/files',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-file-by-folder-Id
     * @param id
     * @param requestBody
     * @returns CollectionModelFile OK
     * @throws ApiError
     */
    public static createPropertyReferenceFolderPut1(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<CollectionModelFile> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/folders/{id}/files',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-file-by-folder-Id
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceFolderDelete1(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}/files',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-file-by-folder-Id
     * @param id
     * @param requestBody
     * @returns CollectionModelFile OK
     * @throws ApiError
     */
    public static createPropertyReferenceFolderPatch1(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<CollectionModelFile> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/folders/{id}/files',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-file-by-folder-Id
     * @param id
     * @param propertyId
     * @returns CollectionModelFile OK
     * @throws ApiError
     */
    public static followPropertyReferenceFolderGet2(
        id: string,
        propertyId: string,
    ): CancelablePromise<CollectionModelFile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}/files/{propertyId}',
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
     * delete-file-by-folder-Id
     * @param id
     * @param propertyId
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceIdFolderDelete1(
        id: string,
        propertyId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}/files/{propertyId}',
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
     * get-folder-by-folder-Id
     * @param id
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static followPropertyReferenceFolderGet31(
        id: string,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}/parent',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * update-folder-by-folder-Id
     * @param id
     * @param requestBody
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static createPropertyReferenceFolderPut2(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/folders/{id}/parent',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete-folder-by-folder-Id
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceFolderDelete2(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}/parent',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * patch-folder-by-folder-Id
     * @param id
     * @param requestBody
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static createPropertyReferenceFolderPatch2(
        id: string,
        requestBody: CollectionModelObject,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/folders/{id}/parent',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * get-folder-by-folder-Id
     * @param id
     * @param propertyId
     * @returns EntityModelFolder OK
     * @throws ApiError
     */
    public static followPropertyReferenceFolderGet3(
        id: string,
        propertyId: string,
    ): CancelablePromise<EntityModelFolder> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folders/{id}/parent/{propertyId}',
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
     * delete-folder-by-folder-Id
     * @param id
     * @param propertyId
     * @returns void
     * @throws ApiError
     */
    public static deletePropertyReferenceIdFolderDelete2(
        id: string,
        propertyId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folders/{id}/parent/{propertyId}',
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
