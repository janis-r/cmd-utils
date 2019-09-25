#!/usr/bin/env node
const fs = require("fs");

const FileParam = "file";
const DestParam = "dest";
const RemoveElementsParam = "remove-elements";

const knownParams = [FileParam, DestParam, RemoveElementsParam];
const parsedParams = parseArgs();

const file = parsedParams[FileParam] || "package.json";
const dest = parsedParams[DestParam] || "dist";
const removeElements = parsedParams[RemoveElementsParam] || ["scripts", "devDependencies"];

if (!fs.existsSync(file)) {
    console.error(`File "${file}" do not exist!`);
    process.exit();
}

if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}

fs.readFile(file, {encoding: "utf8"}, (err, data) => {
    const packageData = JSON.parse(data);

    removeElements.filter(element => element in packageData).forEach(element => delete packageData[element]);

    fs.writeFile(`${dest}/${file}`, JSON.stringify(packageData, null, 2), {encoding: "utf8"}, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

function parseArgs() {
    const [, , ...args] = process.argv;

    const parsedParams = {};
    for (let i = 0; i < args.length; i++) {
        let paramName = args[i];
        if (paramName.indexOf('--') !== 0) {
            console.warn(`Param name "${paramName}" does not start with -- and will be ignored`);
            continue;
        }

        paramName = paramName.replace(/^--/, '');
        if (!knownParams.includes(paramName)) {
            console.warn(`Unknown param name "${paramName}"`);
            continue;
        }

        if (i === args.length - 1) {
            console.warn(`Param "${paramName}" provided with no value`);
            continue;
        }

        let paramValue = args[++i];
        if (paramName === "remove-elements") {
            paramValue = paramValue.split(',');
        }
        parsedParams[paramName] = paramValue;
    }

    return parsedParams;
}
