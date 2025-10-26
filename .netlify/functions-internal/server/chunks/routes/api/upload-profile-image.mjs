import { d as defineEventHandler, c as createError, b as readMultipartFormData } from '../../nitro/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const uploadProfileImage = defineEventHandler(async (event) => {
  var _a;
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const userId = `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file provided"
      });
    }
    const fileData = formData.find((item) => item.name === "file");
    if (!fileData || !fileData.data) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file found in request"
      });
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(fileData.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed"
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (fileData.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: "File too large. Maximum size is 5MB"
      });
    }
    const timestamp = Date.now();
    const fileExtension = ((_a = fileData.filename) == null ? void 0 : _a.split(".").pop()) || "jpg";
    const fileName = `profile_${userId}_${timestamp}.${fileExtension}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from("profile-images").upload(fileName, fileData.data, {
      contentType: fileData.type,
      upsert: true
      // Allow overwriting existing files
    });
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw createError({
        statusCode: 500,
        statusMessage: `Upload failed: ${uploadError.message}`
      });
    }
    const { data: urlData } = supabase.storage.from("profile-images").getPublicUrl(fileName);
    return {
      success: true,
      message: "Profile image uploaded successfully",
      data: {
        fileName,
        publicUrl: urlData.publicUrl,
        path: uploadData.path,
        userId
      }
    };
  } catch (error) {
    console.error("Profile image upload error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error during upload"
    });
  }
});

export { uploadProfileImage as default };
//# sourceMappingURL=upload-profile-image.mjs.map
