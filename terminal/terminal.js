// Manipulable Elements
const cmdInput = document.getElementById('terminal-prompt');
const pathText = document.getElementById('terminal-path');

// Line Renderer
const renderer = {
    _: document.getElementById('terminal-history'),
    scrollEnd: () => {
        let last = -1;
        while (last !== renderer._.scrollTop) {
            last = renderer._.scrollTop;
            renderer._.scrollTop += 100;
        }
    },
    clear: () => {
        renderer._.innerHTML = ''
    },
    render: (text, raw) => {
        const line = document.createElement('p');
        line.classList.add('terminal-line');
        line.innerHTML = `${raw ? '' : `<span>guest ${dir['~abs']} $</span>`}${text}`;
        renderer._.appendChild(line);
        renderer.scrollEnd();
    }
};

// Directory Structure
let dir = {
    '~abs': '/'
};
const root = dir; //todo i need to make the text start at the bottom not the top
//todo add a todos file: for now,
//    - add tab complete
//    - add a cmd history and arrows
//    - save history in cookie? also save newly created directories if i add support for that.
//    - fix alignment of guest / ~ and type area
//    - generally support paths better. Not sure a good way, but need to support ./path/to/file everywhere, not just cd
//    - investigate whether there is an xss risk (there is, but im not sure if it matters or not yet)

function processCommand(line) {
    renderer.render(line);

    const parts = line.split(' ');
    const cmd = parts[0].toLowerCase();
    for (let i = 0; i < cmdKeys.length; i++) {
        if (cmd === cmdKeys[i]) {
            commands[cmdKeys[i]](parts.slice(1));
            return;
        }
    }

    renderer.render(`Unknown command ${cmd}. Try 'help' for a list of commands.`, true)
}

cmdInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter')
        return;
    processCommand(cmdInput.value.replace('~', ''));
    cmdInput.value = '';
});
