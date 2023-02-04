import test from "ava";
import { sitemap } from ".";

test("sitemap() returns undefined", (t) => {
  t.is(sitemap(), undefined);
});
