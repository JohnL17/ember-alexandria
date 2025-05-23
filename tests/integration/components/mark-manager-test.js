/* eslint-disable import/no-named-as-default-member */
import Service from "@ember/service";
import { render, click } from "@ember/test-helpers";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupMirage } from "ember-cli-mirage/test-support";
import { module, test } from "qunit";
import sinon from "sinon";

class TagServiceStub extends Service {
  fetchAllTags = {
    // eslint-disable-next-line import/no-named-as-default-member
    perform: sinon.fake(),
  };

  add(doc, tag) {
    doc.tags.push({ name: tag });
    return tag;
  }

  remove(doc, tag) {
    doc.tags = doc.tags.filter((t) => t.name !== tag);
    return tag;
  }
}

const mockConfigService = class ConfigService extends Service {
  get marks() {
    return [
      {
        type: "foo",
        icon: "bolt",
      },
      {
        type: "bar",
        icon: "file",
      },
    ];
  }
};

module("Integration | Component | mark-manager", function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.owner.register("service:config", mockConfigService);
    this.owner.register("service:tags", TagServiceStub);
  });

  test("it renders mark manager", async function (assert) {
    this.documents = [
      {
        title: "Test",
        category: { color: "#F00" },
        createdAt: new Date(1998, 11, 11),
        createdByUser: "user1",
        createdByGroup: "group1",
        files: [
          {
            variant: "original",
            name: "some-file.pdf",
            createdByUser: null,
            downloadUrl: "http://test.com",
          },
        ],
        tags: [],
      },
    ];

    await render(hbs`<MarkManager @documents={{this.documents}} />`);

    assert.dom("label").exists({ count: 2 });
    assert.dom("input").isNotChecked();

    await click("input");

    assert.dom("input").isChecked();

    await click("input");

    assert.dom("input").isNotChecked();
  });
});
