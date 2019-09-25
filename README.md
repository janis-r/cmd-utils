# JDR command line utils package

Serving command line tools useful for authors personal usage

## Commands

### export-package-json

Copy `package.json` of npm project (or any other `JSON` file) to export folder and remove some data entries in a process. 

Example:
```cmd
export-package-json --file package.json --dest dist --remove-elements scripts,devDependencies
```

Where:

- `file` point to file that should be copied and altered (`package.json` is q default value)
- `dest` point to folder where updated file should should be moved to (`dist` is q default value)
- `remove-elements` is comma separated listing of top level JSON entries to be deleted (`scripts,devDependencies` is a 
default value)

This is created while working with `TypeScript` based projects that in order to be published to `NPM`, require 
transpilation result being stored in separate folder and augmented with `package.json` before `npm publish` can be 
invoked.
