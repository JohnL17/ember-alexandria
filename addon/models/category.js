import { attr, hasMany, belongsTo } from "@ember-data/model";
import { LocalizedModel, localizedAttr } from "ember-localized-model";

export default class CategoryModel extends LocalizedModel {
  @localizedAttr name;
  @localizedAttr description;
  @attr color;
  @attr metainfo;

  @belongsTo("category", { inverse: "children", async: true }) parent;
  @hasMany("category", { inverse: "parent", async: true }) children;
  @hasMany("document", { inverse: "category", async: true }) documents;
}
