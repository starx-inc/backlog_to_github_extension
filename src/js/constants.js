export const NEWLINE = "%0A"
export const BREAKLINE = "\n"

// Key
export const GITHUB_URL_KEY = 'github_url'
export const GITHUB_TITLE_KEY = 'github_title'
export const GITHUB_BODY_KEY = 'github_body'

// Template
export const GITHUB_TITLE_TEMPLATE = "[`種別`][`キー`][`件名`]"

export const GITHUB_BODY_TEMPLATE =  "# New Github issue" + BREAKLINE +
                            "### Backlog URL" + BREAKLINE +
                            "[`キー`](https://starx.backlog.com/view/`キー`)"

export const NAME_ID_MAPPING =
  {
    "種別": "issueType",
    "キー": "issueKey",
    "件名": "summary",
    "担当者": "assignee",
    "状態": "status",
    "優先度": "priority"
  }

export const SPECIAL_CHAR_MAPPING =
  {
    "#": '%23',
    "\n": "%0A"
  }