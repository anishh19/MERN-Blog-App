import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "./ourFileRouter";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
