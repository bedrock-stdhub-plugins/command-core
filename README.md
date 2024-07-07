# stdhub-plugin-command-core

The core plugin for handling plugin-defined commands from players.

# Usage

Copy the plugin to the `plugins` directory. Any plugin that has custom commands must rely on this plugin.

## Configuration

```yaml
commandPrefix: .
```
The only option is the prefix of commands.

If you want to change that into other values, you'd better wrap the new value with quotes, for example:
```yaml
commandPrefix: "!"
```
or unexpected things will happen.

## `perm` command

Patterns:

```
perm [create|delete] [group: string]
```
Creates or deletes a permission group (extends `default` by default).

```
perm create [group: string] [extendsFrom: string]
```
Creates a permission group that extends from another group.

```
perm [grant|revoke] [group: string] [permission: string]
```
Grants or revokes a permission to/from a group.

```
perm [add|remove] [player: string] [group: string]
```
Adds or removes a player from a group.

```
perm list groups
```
Lists all permission groups.

```
perm list group-of [player: string]
```
Lists the permission group of a player.

```
perm list perm-of [explicit|all] [group: string]
```
Lists the permissions of a group.
