import { Structure as _Structure_ } from "@aws-sdk/types";

export const _S3ContentLocationUpdate: _Structure_ = {
  type: "structure",
  required: [],
  members: {
    BucketARNUpdate: {
      shape: {
        type: "string",
        min: 1
      }
    },
    FileKeyUpdate: {
      shape: {
        type: "string",
        min: 1
      }
    },
    ObjectVersionUpdate: {
      shape: {
        type: "string"
      }
    }
  }
};