import { Command } from 'stdhub-plugin-api';
import { api } from './main';

export function initPermCommand() {
  const permCommand = new Command();

  permCommand.addHandler([
    [ 'create', 'delete' ],
    { type: 'string', displayName: 'group' }
  ] as const, async (caller, [ action, group ]) => {
    if (action === 'create') {
      await api.createPermissionGroup(group);
      caller.sendMessage(`§aGroup §e${group}§a created`);
    } else { // delete
      await api.deletePermissionGroup(group);
      caller.sendMessage(`§aGroup §e${group}§a deleted`);
    }
  });

  permCommand.addHandler([
    'create',
    { type: 'string', displayName: 'group' },
    { type: 'string', displayName: 'extendsFrom' }
  ] as const , async (caller, [ , group, extendsFrom ]) => {
    await api.createPermissionGroup(group, extendsFrom);
    caller.sendMessage(`§aGroup §e${group}§a created`);
  });

  permCommand.addHandler([
    [ 'grant', 'revoke' ],
    { type: 'string', displayName: 'group' },
    { type: 'string', displayName: 'permission' }
  ] as const, async (caller, [ action, group, permission, ]) => {
    if (action === 'grant') {
      await api.grantPermissionToGroup(group, permission);
      caller.sendMessage(`§aPermission §e${permission}§a granted to group §e${group}`);
    } else { // revoke
      await api.revokePermissionFromGroup(group, permission);
      caller.sendMessage(`§aPermission §e${permission}§a revoked from group §e${group}`);
    }
  });

  permCommand.addHandler([
    [ 'add', 'remove' ],
    { type: 'string', displayName: 'player' },
    { type: 'string', displayName: 'group' }
  ] as const, async (caller, [ action, player, group ]) => {
    if (action === 'add') {
      await api.addPlayerToGroup(player, group);
      caller.sendMessage(`§aPlayer §e${player}§a added to group §e${group}`);
    } else { // remove
      await api.removePlayerFromGroup(player, group);
      caller.sendMessage(`§aPlayer §e${player}§a removed from group §e${group}`);
    }
  });

  permCommand.addHandler([
    'list',
    'groups'
  ], async (caller) => {
    const groups = await api.listAllGroups();
    caller.sendMessage(`§aGroups: §e${groups}`);
  });

  permCommand.addHandler([
    'list',
    'group-of',
    { type: 'string', displayName: 'player' }
  ] as const, async (caller, [ , , player ]) => {
    const groups = await api.listGroupsOfPlayer(player);
    caller.sendMessage(`§aPlayer §e${player}§a is in groups: §e${groups}`);
  });

  permCommand.addHandler([
    'list',
    'perm-of',
    [ 'explicit', 'all' ],
    { type: 'string', displayName: 'group' }
  ] as const, async (caller, [ , , explicitOrAll, group ]) => {
    if (explicitOrAll === 'explicit') {
      const permissions = await api.listExplicitPermissionsOfGroup(group);
      caller.sendMessage(`§aExplicit permissions of group §e${group}§a: §e${permissions}`);
    } else {
      const permissions = await api.listAllPermissionsOfGroup(group);
      caller.sendMessage(`§aAll permissions of group §e${group}§a: §e${permissions}`);
    }
  });

  api.registerCommand('perm', permCommand, 'perm');
}