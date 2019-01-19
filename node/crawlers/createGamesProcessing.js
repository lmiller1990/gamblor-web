"use strict";
exports.__esModule = true;
var fs = require("fs");
var createGameUtils_1 = require("./createGameUtils");
function readData(market) {
    var crawledData = fs.readFileSync("./node/odds/" + market + "/bet365.csv", 'utf8').split('\n');
    var games = [];
    for (var i = 0; i < crawledData.length; i++) {
        if (i === 0) {
            // skip - team_1,team_2,team_1_odds,team_2_odds
        }
        else {
            var data = crawledData[i].split(',');
            var gameData = {
                team1: data[0],
                team2: data[1],
                team1odds: parseFloat(data[2]),
                team2odds: parseFloat(data[3])
            };
            games.push(gameData);
        }
    }
    return games;
}
exports.readData = readData;
function getGames() {
    var crawledData = fs.readFileSync('./node/odds/fb/bet365.csv', 'utf8').split('\n');
    var games = [];
    for (var i = 0; i < crawledData.length; i++) {
        if (i === 0) {
            // skip - team_1,team_2,team_1_odds,team_2_odds
        }
        else {
            var data = crawledData[i].split(',');
            var game = {
                gameNumber: 1,
                redSideTeamId: 0,
                blueSideTeamId: 0,
                leagueId: 0,
                splitId: 0
            };
            games.push(game);
        }
    }
    return games;
}
exports.getGames = getGames;
function csvToGames(split, teams) {
    var gamesFromCsv = readData('fb');
    var gamesToPost = [];
    for (var g in gamesFromCsv) {
        var game = gamesFromCsv[g];
        var blueTeam = createGameUtils_1.getTeamByName(game.team1, teams);
        var redTeam = createGameUtils_1.getTeamByName(game.team2, teams);
        var newGame = {
            gameNumber: 1,
            splitId: split.id,
            leagueId: split.leagueId,
            redSideTeamId: redTeam.id,
            blueSideTeamId: blueTeam.id
        };
        gamesToPost.push(newGame);
    }
    return gamesToPost;
}
exports.csvToGames = csvToGames;
