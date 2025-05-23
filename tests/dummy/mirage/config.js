import { createServer, Response } from "miragejs";

export default function makeServer(config) {
  return createServer({
    ...config,
    routes() {
      this.urlPrefix = "";
      this.namespace = "/api/v1";
      this.timing = 400;

      this.get("/categories");
      this.get("/categories/:id");

      this.get("/documents");
      this.get("/documents/:id");
      this.patch("/documents/:id");
      this.post("/documents");
      this.delete("/documents/:id");

      this.get("/tags");
      this.get("/tags/:id");
      this.post("/tags");
      this.patch("/tags/:id");

      this.post("/files", function (schema) {
        const attrs = this.normalizedRequestAttrs();
        return schema.files.create({
          ...attrs,
          uploadUrl: "/api/v1/file-upload",
        });
      });

      this.put("/file-upload", () => new Response(201, {}, {}));
    },
  });
}
