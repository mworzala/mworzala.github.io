window.addEventListener('load', () => {
    // Make projects directory
    makeDirectory('projects');
    commands.cd(['projects']);

    // Add Projects
    makeTextFile('sos', `
    sos is really cool\n
    How do really long lines work? I am not sure but I hope that they appear in a paragraph form because that would work out nicely for me I think. This line should be fairly long at this point, at least I would think so.
    i <a href="//google.com/">dont</a> think?\n
    `);

    // Return to root directory
    commands.cd([]);
});
