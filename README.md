# plugin-template

A `bedrock-stdhub` plugin starter project.

# Usage

First, check the `plugin.yaml` in the project root, and edit it. Specify the plugin name and description.

Then, code in `scripts/main.ts`. This is the entry file, which will be loaded by BDS at first.

You can create multiple files in `scripts` directory. In the built plugin, all the source files will be bundled into one file.

Execute `npm run [task name]` to run a task. Possible tasks are as follows:

- `build`: Build a minified plugin file for production use.
- `debug`: Build a plugin file and copy it to the specified directory. To specify such a directory, create a file `.env` in the project root directory and add such a line:
  ```properties
  debugCopyDest=
  ```
  Specify the path to `plugins` folder at BDS root directory. For example, `'D:\\workspace\\stdhub\\bedrock-server-1.21.1.03\\plugins'`.
- `update-dependency`: Update the version of `@minecraft/server` according to `targetMinecraftVersion` you've specified in `plugin.yaml`. After executing this task, **fully check your code to see if there is any reference failure**.