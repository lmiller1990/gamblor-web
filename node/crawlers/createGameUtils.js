"use strict";
exports.__esModule = true;
function getTeamByName(name, teams) {
    for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
        var team = teams_1[_i];
        if (team.name.toLowerCase() === name) {
            return team;
        }
    }
    return null;
}
exports.getTeamByName = getTeamByName;
/**
 * Given a list of leagues from the api,
 * get the split for the games, matched against a given
 * league and split name.
 *
 * EG: using the two strings LCK, Summer Split,
 * return an ISplit: { leagueId: <LCK League Id>, id: <Summer Split Id> }
 */
function getSplit(leagues, splitName, leagueName) {
    for (var _i = 0, leagues_1 = leagues; _i < leagues_1.length; _i++) {
        var league = leagues_1[_i];
        if (league.name === leagueName) {
            for (var _a = 0, _b = league.splits; _a < _b.length; _a++) {
                var split = _b[_a];
                if (split.name === splitName) {
                    return split;
                }
            }
        }
    }
    return null;
}
exports.getSplit = getSplit;
/**
 * given two team names, eg Team SoloMid and CLG,
 * iterate over a list of games and see if a game between those two teams
 * exists.
 */
function isNewGame(theGame, games) {
    for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
        var game = games_1[_i];
        // @ts-ignore
        if ([game.redSideTeamId, game.blueSideTeamId].includes(theGame.redSideTeamId)) {
            // @ts-ignore
            if ([game.redSideTeamId, game.blueSideTeamId].includes(theGame.blueSideTeamId)) {
                return false;
            }
        }
    }
    return true;
}
exports.isNewGame = isNewGame;
