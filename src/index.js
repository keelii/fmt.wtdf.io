import codemirror from 'codemirror'
import { toCamelCase } from './utils.js'

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

window.changeMode = function(el) {
    const modeMap = {
        'babel': 'javascript',
        'css': 'text/x-css',
        'scss': 'text/x-scss',
        'less': 'text/x-less',
        'html': 'htmlmixed',
        'json': 'application/ld+json',
        'json-stringify': 'application/ld+json',
        'markdown': 'markdown'
    }
    const mode = modeMap[el.value]
    if (mode) {
        editor.setOption('mode', mode)
    }
}

window.fmtOption = function() {
    let input = document.querySelectorAll('#fmt-form [name]')
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
        printWidth: 1000,
        tabWidth: 4,
        plugins: prettierPlugins
    }
    cm.setValue(prettier.format(cm.getValue(), Object.assign({}, defaults, options)))
}
window.clearContent = function() {
    editor.setValue('')
    localStorage.setItem('content', '')
}

editor.on('change', function(e) {
    localStorage.setItem('content', editor.getValue())
})

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('content')) {
        editor.setValue(localStorage.getItem('content'))
    }
})
