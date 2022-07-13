/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FolderRequestBody = {
    id?: string;
    name?: string;
    created?: string;
    summary?: string;
    parent?: string;
    childs?: Array<string>;
    files?: Array<string>;
};

