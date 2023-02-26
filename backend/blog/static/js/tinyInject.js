// Sets up TinyMCE editor
tinymce.init({
  selector: "textarea",
  browser_spellcheck: true,
  plugins: [
    "advlist",
    "autolink",
    "autosave",
    "charmap",
    "emoticons",
    "image",
    "link",
    "lists",
    "media",
    "table",
    "visualblocks",
    "visualchars",
    "wordcount",
  ],
  toolbar:
    "undo redo | bold italic | h2 h3 h4 | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link image emoticons charmap",
  charmap: [
    [0x00a0, "nonbreaking space"],
    [0x2013, "en dash"],
    [0x2014, "em dash"],
    [0x2026, "horizontal ellipsis"],
    [0x00bc, "one quarter"],
    [0x00bd, "one half"],
    [0x00be, "three quarters"],
    [0x2122, "trademark"],
    [0x00a9, "copyright"],
    [0x00ae, "registered"],
    [0x2191, "arrow up"],
    [0x2193, "arrow down"],
    [0x2195, "arrow up down"],
    [0x2190, "arrow left"],
    [0x2192, "arrow right"],
    [0x2194, "arrow left right"],
  ],
  menubar: false,
});