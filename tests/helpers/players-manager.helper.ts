import * as _ from 'lodash';
import { PlayersManager } from '../../src/players-manager';
import { Player } from '../../src/player';
import { LevelPreset } from '../../src/level-preset';
import { RoleId } from '../../src/enums/role-id';
import { LevelPresetId } from '../../src/types/level-preset-id';

export class PlayersManagerHelper {
  static addPlayersAndAssignRoles(manager: PlayersManager, number: number) {
    PlayersManagerHelper.fillPlayers(manager, number);
    PlayersManagerHelper.assignRoles(manager);
  }

  static fillPlayers(manager: PlayersManager, number: number) {
    _.times(number, (i: number) => manager.add(new Player(`user-${i}`)));
  }

  static assignRoles(manager: PlayersManager) {
    manager.assignRoles(new LevelPreset(manager.getAll().length as LevelPresetId));
  }

  static getAssassin(manager: PlayersManager) {
    return manager.getAll().find(p => p.isAssassin());
  }

  static getMerlin(manager: PlayersManager) {
    return manager.getAll().find(
      (p) => p.getRole().getId() === RoleId.Merlin,
    );
  }

  static getProposedPlayers(manager: PlayersManager) {
    const username = manager.getAll()[0].getUsername();

    return manager.serialize(username, false)
      .proposedPlayerUsernames
      .map(username => manager.getAll().find(p => p.getUsername() === username));
  }

  static getNonAssassin(manager: PlayersManager) {
    const assassinsUsername = PlayersManagerHelper.getAssassin(manager).getUsername();

    return manager.getAll().find((p) => p.getUsername() !== assassinsUsername);
  }

  static getNonAssassinNonMerlin(manager: PlayersManager) {
    const assassinsUsername = PlayersManagerHelper.getAssassin(manager).getUsername();

    return manager.getAll()
      .find(p => {
        return p.getUsername() !== assassinsUsername
          && p.getRole().getId() !== RoleId.Merlin;
      });
  }
}
