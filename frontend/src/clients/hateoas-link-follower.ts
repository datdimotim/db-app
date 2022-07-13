import {CancelablePromise, OpenAPI} from 'src/clients/generated';
import {request as __request} from 'src/clients/generated/core/request';

const config = Object.assign({}, OpenAPI, {BASE: ''})

export default function followLink<T>(url: string): CancelablePromise<T> {
  return __request(config, {
    method: 'GET',
    url: url
  });
}
