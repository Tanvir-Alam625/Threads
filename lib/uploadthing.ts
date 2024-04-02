
/**
 * This file is a helper for using the UploadThing API in React.
 * It provides a custom hook and a function for uploading files.
 * @project videon
*/

import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
    generateReactHelpers<OurFileRouter>();