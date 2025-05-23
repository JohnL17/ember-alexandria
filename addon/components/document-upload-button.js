import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { task } from "ember-concurrency";
import { query } from "ember-data-resources";

import { ErrorHandler } from "ember-alexandria/helpers/error-handler";

export default class DocumentUploadButtonComponent extends Component {
  @service notification;
  @service intl;
  @service store;
  @service documents;

  categories = query(this, "category", () => ({
    "filter[hasParent]": false,
    include: "children",
  }));

  @task *upload(category, { target: { files = [] } = {} }) {
    try {
      yield this.documents.upload(category, files);

      this.notification.success(
        this.intl.t("alexandria.success.upload-document", {
          count: files.length,
        }),
      );

      if (this.args.afterUpload) {
        this.args.afterUpload();
      }
    } catch (error) {
      new ErrorHandler(this, error).notify(
        "alexandria.errors.upload-document",
        {
          count: files.length,
        },
      );
    }
  }
}
