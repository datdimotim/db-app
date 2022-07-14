import {CancelablePromise, OpenAPI} from 'src/clients/generated';
import {request as __request} from 'src/clients/generated/core/request';

const config = Object.assign({}, OpenAPI, {BASE: ''})

export default function uploadFileContent<T>(url: string, file: File): CancelablePromise<T> {
  return __request(config, {
    method: 'PUT',
    url: url,
    formData: {
      file
    }
  });
}
