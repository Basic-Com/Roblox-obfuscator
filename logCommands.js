const fs = require("fs");
const path = require("path");

function logCommandStructure(basePath, prefix = "") {
    const items = fs.readdirSync(basePath);

    items.forEach((item, index) => {
        const fullPath = path.join(basePath, item);
        const isLast = index === items.length - 1;
        const prefixBranch = isLast ? "└──" : "├──";

        console.log(`${prefix}${prefixBranch} ${item}`);

        if (fs.statSync(fullPath).isDirectory()) {
            logCommandStructure(fullPath, prefix + (isLast ? "    " : "│   "));
        }
    });
}

module.exports = { logCommandStructure };
