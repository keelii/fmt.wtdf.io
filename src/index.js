import codemirror from 'codemirror'

require('../node_modules/codemirror/lib/codemirror.css')

require('../node_modules/codemirror/mode/javascript/javascript.js')
require('../node_modules/codemirror/addon/display/placeholder.js')

require('../node_modules/codemirror/mode/xml/xml.js')
require('../node_modules/codemirror/mode/css/css.js')
require('../node_modules/codemirror/mode/jsx/jsx.js')
require('../node_modules/codemirror/mode/markdown/markdown.js')
require('../node_modules/codemirror/mode/htmlmixed/htmlmixed.js')

require('../node_modules/codemirror/addon/fold/foldgutter.css')
require('../node_modules/codemirror/addon/fold/foldgutter.js')
require('../node_modules/codemirror/addon/fold/foldcode.js')
require('../node_modules/codemirror/addon/fold/brace-fold.js')
require('../node_modules/codemirror/addon/fold/xml-fold.js')
require('../node_modules/codemirror/addon/fold/indent-fold.js')
require('../node_modules/codemirror/addon/fold/markdown-fold.js')
require('../node_modules/codemirror/addon/comment/comment.js')

let editor = window.editor = codemirror(document.getElementById('editor'), {
    value: '',
    mode: 'javascript',
    lineNumbers: true,
    viewportMargin: 100,
    placeholder: 'Paste JavaScript/HTML/CSS here',
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
})

window.format = function(cm) {
    cm.setValue(prettier.format(cm.getValue(), {
        parser: 'babylon',
        tabWidth: 4,
        semi: false,
        plugins: prettierPlugins
    }))
}
window.clearContent = function() {
    editor.setValue('')
}

editor.on('change', function(e) {
    // prettier(editor.getValue())
})

// console.log(editor.setValue())