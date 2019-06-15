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

const toCamelCase = str => {
    let s = str && str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
        .join('')
    return s.slice(0, 1).toLowerCase() + s.slice(1)
}

window.fmtOption = function() {
    let input = document.querySelectorAll('#fmt-form input')
    let params = {}
    input.forEach(inp => {
        let name = inp.getAttribute('name')
        let value = inp.value
        if (inp.type === 'checkbox') value = inp.checked
        if (inp.type === 'number') value = Number(inp.value)

        params[toCamelCase(name)] = value
    })
    return params
}

window.format = function(cm) {
    let options = fmtOption()
    let defaults = {
        parser: 'babylon',
        plugins: prettierPlugins
    }
    cm.setValue(prettier.format(cm.getValue(), Object.assign({}, defaults, options)))
}
window.clearContent = function() {
    editor.setValue('')
}

editor.on('change', function(e) {
    // prettier(editor.getValue())
})

// console.log(editor.setValue())