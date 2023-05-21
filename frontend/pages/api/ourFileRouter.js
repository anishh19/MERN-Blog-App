/** server/uploadthing.ts */
import { createUploadthing } from "uploadthing/next-legacy";
const f = createUploadthing();

const auth = (req, res) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f
    // Set permissions and file types for this FileRoute
    .fileTypes(["image"])
    .maxSize("5MB")
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);
    }),
};

exports.OurFileRouter = exports.ourFileRouter;
