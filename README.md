open-in-vcs-cli
===============

CLI tool that lets you open the specified line/file/folder/repo in GitHub/GitLab/Azure DevOps

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/open-in-vcs-cli.svg)](https://npmjs.org/package/open-in-vcs-cli)
[![Downloads/week](https://img.shields.io/npm/dw/open-in-vcs-cli.svg)](https://npmjs.org/package/open-in-vcs-cli)
[![License](https://img.shields.io/npm/l/open-in-vcs-cli.svg)](https://github.com/Jmorjsm/open-in-vcs-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Installing
open-in-vcs-cli can  be installed using npm:
```bash
# install open-in-vcs-cli
npm install -g open-in-vcs-cli
```
# Usage
<!-- usage -->
## Open
The `open` command is the main command open-in-vcs-cli provides. It allows you to open files, directories, repositories in your version control software, based on the remote url.

### Opening directories
```bash
# open the current directory in your VCS
oiv open .
```
### Opening files
```bash
# open readme.md
oiv open readme.md```
```

### Opening files highlighting a single line
```bash
# open readme.md, highlighting line 10
oiv open readme.md --startLineNumber 10
```

### Opening files highlighting multiple lines
```bash
# open readme.md, highlighting line 10-line 20 
oiv open readme.md --startLineNumber 10 --endLineNumber 20
```
<!-- usagestop -->
