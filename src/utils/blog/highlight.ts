import 'highlight.js/styles/atom-one-dark.css';
import 'highlightjs-copy/styles/highlightjs-copy.css';
import './highlight.css';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import CopyButtonPlugin from 'highlightjs-copy';

export default () => {
  hljs.addPlugin(new CopyButtonPlugin());
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('php', php);
  hljs.highlightAll();
};
