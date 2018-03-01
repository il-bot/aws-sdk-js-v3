import {ResponseMetadata as __ResponseMetadata__, ServiceException as __ServiceException__} from '@aws/types';

/**
 * <p>The request was rejected because the specified <code>GrantId</code> is not valid.</p>
 */
export interface InvalidGrantIdException extends __ServiceException__<_InvalidGrantIdExceptionDetails> {
    name: 'InvalidGrantIdException';
}

export interface _InvalidGrantIdExceptionDetails {
    /**
     * _ErrorMessageType shape
     */
    message?: string;
}