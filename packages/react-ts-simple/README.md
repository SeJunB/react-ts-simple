# react-ts-simple

## About
Creates a React Application with minimal markup.

## How does it work ?
When the user types in the command `npx react-ts-simple create`, the `bin/index.js` is executed.
This scripts does the following:
1. Creates a directory.
2. Initializes package.json in that folder.
3. Adds the [react-ts-simple-template](https://www.npmjs.com/package/react-ts-simple-template) package.
4. Copies all of the files in `node_modules/react-ts-simple-template` to the created directory.
5. Creates a new package.json using the package.json from the template.