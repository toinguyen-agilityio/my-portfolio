# report.json format

`scripts/build-report.mjs` reads one JSON file and the screenshots it lists. Paths to screenshots are relative to the JSON file.

A full real example is in [../examples/release-1/report.json](../examples/release-1/report.json).

## Text values

Every text field (marked **T** below) is either a plain string or an object with one string per language:

```json
"title": "Brand link goes home"
"title": { "en": "Brand link goes home", "vi": "Logo tên dẫn về trang chủ" }
```

`languages` sets which keys are used and the order of the language buttons. The first language is the default. A single-language report has no toggle. Wrap file names and fields in backticks (`` `location` ``) to show them as code; no other markup is allowed.

## Top level

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | T | yes | Release name, e.g. `"Release 1"`. |
| `languages` | string[] | no | Default `["en"]`. Built-in UI labels exist for `en` and `vi`. |
| `eyebrow` | T | no | Default "Release test report". |
| `meta` | T | no | When, on what build, which browser, which commit, which widths and themes. |
| `issuesNote`, `casesNote` | T | no | Small note under each summary card. |
| `issues` | Issue[] | yes | Rendered in this order: sort by issue number. |
| `notCovered` | T[] | no | What was not checked and why (real Safari, real phones, Lighthouse…). |
| `footer` | object | no | `{ "title": T, "items": [{ "text": T, "href": "…", "linkText": "…" }] }`, e.g. the evidence PR. |

The failure banner, all counts and every pass/fail label of an issue are computed from the cases. Do not write them by hand.

## Issue

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Used in anchors (`#i-<id>`). Use the issue number, or a slug when several issues are tested together (`"sport"`). |
| `label` | string | no | Shown above the title, e.g. `"#101 and #102"`. Default `#<id>`. |
| `title` | T | yes | Short name of the feature. |
| `links` | `{text, href}[]` | no | The GitHub issue(s). |
| `cases` | Case[] | yes | |
| `extra` | `{status, text}[]` | no | Release-wide checks with no screenshots (console errors, placeholder scan). |

## Case

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Unique, e.g. `"105-1"`. Screenshots and anchors use it. |
| `title` | T | yes | What the case covers, in a few words. |
| `status` | `"pass"` \| `"fail"` | yes | |
| `tested` | T | yes | What was done: pages, widths, themes, actions. One sentence. |
| `expected` | T | yes | What should happen, from the ticket's acceptance criteria. |
| `result` | T | yes | One sentence: "Matches: …" or "Does not match: …". |
| `findings` | Finding[] | yes when there are screenshots | One bullet per observation, each pointing at its screenshots. |
| `raw` | string[] | no | Raw lines from the test script, shown collapsed. Keep them as logged. |
| `shots` | (string \| Shot)[] | no | Screenshot files, numbered 1…n in this order. |

### Finding

```json
{ "text": { "en": "Post 2 card shows no location: `location` is missing in golden-hour-river.mdx.", "vi": "…" }, "shots": [3, 6] }
```

`shots` are 1-based numbers into the case's `shots` list. The script stops with an error when a number is out of range, and warns about a screenshot that no finding points to.

### Shot

A string is the file path. Use an object to override the caption:

```json
{ "file": "shots/98-2-hover-light-1280.png", "label": { "en": "Hover state", "vi": "Trạng thái hover" } }
```

Without a label, the caption is read from the file name, so name files `<case-id>-<what>-<light|dark>-<width>.png`, e.g. `105-1-photography-dark-375.png` → "dark · 375px".

## Minimal example

```json
{
  "title": "Release 2",
  "languages": ["en", "vi"],
  "meta": { "en": "Tested 2026-12-01 on the production build, commit abc1234.", "vi": "Kiểm thử ngày 01/12/2026 trên bản build production, commit abc1234." },
  "issues": [
    {
      "id": "95", "title": { "en": "Rename on navigation", "vi": "Đổi tên trên thanh điều hướng" },
      "links": [{ "text": "#95 Rename only on navigation", "href": "https://github.com/toinguyen-agilityio/my-portfolio/issues/95" }],
      "cases": [
        {
          "id": "95-2", "status": "pass",
          "title": { "en": "Brand link goes home", "vi": "Logo tên dẫn về trang chủ" },
          "tested": { "en": "Click the brand name from /story.", "vi": "Bấm vào tên ở thanh điều hướng khi đang ở /story." },
          "expected": { "en": "It opens the home page.", "vi": "Mở trang chủ." },
          "result": { "en": "Matches: clicking the brand on /story opened /.", "vi": "Đúng như mong muốn: bấm tên ở /story mở ra trang /." },
          "findings": [{ "text": { "en": "Home page after the click", "vi": "Trang chủ sau khi bấm" }, "shots": [1] }],
          "raw": ["clicked brand on /story -> /"],
          "shots": ["shots/95-2-home-after-click-light-1280.png"]
        }
      ]
    }
  ]
}
```
