#! /usr/bin/env node
import * as readline from "node:readline";
import {
  cwd,
  chdir,
  stdin as input,
  stdout as output,
  exit,
} from "node:process";
import { mkdir } from "node:fs/promises";
import { writeFileSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import * as path from "node:path";

const templatePackageName = "react-ts-simple-template";
const NPM_IS_NOT_INSTALLED =
  "Unable to run npm commands. Please ensure that npm is installed.";
const CANNOT_COPY_FROM_TEMPLATE =
  "Unable to copy from the node_modules folder. Maybe check your permissions ?";
var rl = readline.createInterface({
  input,
  output,
});

function die(message) {
  console.error(message);
  exit(1);
}

const executeShellCommandSync = (command) => {
  try {
    execSync(command);
  } catch (e) {
    return false;
  }
  return true;
};

function addTemplate() {
  return (
    executeShellCommandSync("npm init -y") &&
    executeShellCommandSync(`npm add ${templatePackageName}`)
  );
}

function copyFromTemplate() {
  return (
    executeShellCommandSync("rm package-lock.json") &&
    executeShellCommandSync(
      "cp -r node_modules/react-ts-simple-template/* ."
    ) &&
    executeShellCommandSync("rm -rf node_modules/react-ts-simple-template")
  );
}

function doWork() {
  rl.question("Please enter a folder name: ", (folderName) => {
    mkdir(folderName)
      .then(() => {
        const root = path.resolve(cwd(), folderName);
        chdir(root);

        if (!addTemplate()) {
          die(NPM_IS_NOT_INSTALLED);
        }

        if (!copyFromTemplate()) {
          die(CANNOT_COPY_FROM_TEMPLATE);
        }

        const templatePackageJsonPath = path.resolve(root, "package.json");
        // name and description in the template package.json needs to be replaced, since by default it contains the package name and description.
        let templatePackageJson = JSON.parse(
          readFileSync(templatePackageJsonPath)
        );
        templatePackageJson.name = folderName;
        templatePackageJson.description = "";
        writeFileSync(
          templatePackageJsonPath,
          JSON.stringify(templatePackageJson)
        );
        console.log(`🔥Successfully created simple React app in ${root}.🔥`);
        exit(0);
      })
      .catch((e) => {
        die(e);
      });
  });
}

doWork();
