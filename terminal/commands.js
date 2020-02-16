const commands = {
    'mkdir': (args) => {
        if (args.length === 0) {
            renderer.render('usage: mkdir directory', true);
            return;
        }
        if (dir[args[0]])
            return;
        dir[args[0]] = {};

        dir[args[0]]['.'] = dir[args[0]];
        dir[args[0]]['..'] = dir;
        dir[args[0]]['~abs'] = dir['~abs'] + args[0] + '/';
    },
    'cd': (args) => {
        if (args.length === 0)
            dir = root;
        else { //todo handle files (all files have an extension)
            const target = parsePath(args[0]);
            if (target)
                dir = target;
            else renderer.render(`cd: ${args[0]}: No such file or directory`, true);
        }
        pathText.innerText = dir['~abs']
    },
    'ls': (args) => {
        let items = Object.keys(dir).filter((s) => !s.startsWith('~'));
        if (args[0] !== '-a') // Show hidden files
            items = items.filter((s) => !s.startsWith('.'));
        renderer.render(items, true)
    },
    'open': (args) => {
        if (args.length === 0) {
            renderer.render('usage: open file', true);
            return;
        }
        if (!args[0].includes('.') || !dir[args[0]]) {
            renderer.render(`open: ${args[0]}: No such file or directory`, true);
            return;
        }
        dir[args[0]].split('\n').forEach((ln) => renderer.render(ln, true));

    },
    'cat': (args) => commands.open(args),
    'clear': () => renderer.clear(),
};

const cmdKeys = Object.keys(commands);

//todo redo this
function parsePath(path) {
    if (!path)
        return;

    // Account for a trailing slash which should not have any effect.
    if (path.length > 2 && path.endsWith('/'))
        path = path.substr(0, path.length - 1);

    let directory = dir, i = 0;
    const parts = path.split('/');

    // Account for a starting slash to begin search from root.
    if (parts[0].length === 0) {
        if (path.length === 1)
            return root;
        directory = root;
        i = 1;
    }

    // Search for directory
    for (; i < parts.length; i++) {
        directory = directory[parts[i]];
        if (!directory)
            return;
    }
    return directory
}

function makeDirectory(name) {
    if (dir[name])
        return;
    dir[name] = {};

    dir[name]['.'] = dir[name];
    dir[name]['..'] = dir;
    dir[name]['~abs'] = dir['~abs'] + name + '/';
}

function makeTextFile(name, content) {
    if (dir[name])
        return;

    dir[name + '.txt'] = content;
}

function makeExecutable(name, exec) {

}