const fs = require('fs').promises;
const dirPath = process.env.npm_config_path || './foo';

async function getDirFiles(dir) {
    let files = await fs.readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = `${dir}/${file}`;
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
            return getDirFiles(filePath);
        } else if (stats.isFile()) {
            return {
                path: filePath.replace('./', ''),
                type: 'files',
            };
        }
    }));

    return files.reduce((all, folderContents) => all.concat(folderContents), [{
        path: dir.replace('./', ''),
        type: 'dirs',
    }]);
}

(async () => {
    const structs = {
        files: [],
        dirs: [],
    };
    try {
        const allFiles = await getDirFiles(dirPath);
        allFiles.forEach((file) => {
            structs[file.type].push(file.path);
        });
        console.log(structs);
    } catch (e) {
        console.log(e.message);
    }

})();




