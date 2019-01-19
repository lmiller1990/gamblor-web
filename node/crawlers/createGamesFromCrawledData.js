"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var moment = require("moment");
var createGamesProcessing_1 = require("./createGamesProcessing");
var createGameUtils_1 = require("./createGameUtils");
var API_ROUTE = 'http://localhost:3000/api/v1';
function getInitialData() {
    return Promise.all([
        axios_1["default"].get(API_ROUTE + "/games", {
            params: {
                start: moment().add(-1, 'week').format(),
                end: moment().add('1', 'week').format()
            }
        }),
        axios_1["default"].get(API_ROUTE + "/teams"),
        axios_1["default"].get(API_ROUTE + "/leagues")
    ]);
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var markets, argv, leagueName, splitName, _a, gamesResponse, teamsResponse, leaguesResponse, split, gamesToPost, _i, markets_1, market, odds, _b, gamesToPost_1, game, i, ifNewGame, newGames, _c, newGames_1, newGame;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    markets = ['fb', 'ft', 'fd', 'fbaron'];
                    argv = require('minimist')(process.argv.slice(2));
                    leagueName = argv.league;
                    splitName = argv.split;
                    return [4 /*yield*/, getInitialData()
                        // get the split using command line params (split name and league name)
                        // need to know the split id in the database
                    ];
                case 1:
                    _a = _d.sent(), gamesResponse = _a[0], teamsResponse = _a[1], leaguesResponse = _a[2];
                    split = createGameUtils_1.getSplit(leaguesResponse.data, splitName, leagueName);
                    gamesToPost = createGamesProcessing_1.csvToGames(split, teamsResponse.data);
                    // for each market, get the odds and assign them to the
                    // relevant property on the new game
                    // we know the games array and marekts array are the same length
                    // since they were constructed using the same data
                    for (_i = 0, markets_1 = markets; _i < markets_1.length; _i++) {
                        market = markets_1[_i];
                        odds = createGamesProcessing_1.readData(market);
                        for (_b = 0, gamesToPost_1 = gamesToPost; _b < gamesToPost_1.length; _b++) {
                            game = gamesToPost_1[_b];
                            for (i = 0; i < odds.length; i++) {
                                switch (market) {
                                    case 'fb':
                                        game.blueSideTeamFbOdds = odds[i].team1odds;
                                        game.redSideTeamFbOdds = odds[i].team2odds;
                                        break;
                                    case 'ft':
                                        game.blueSideTeamFtOdds = odds[i].team1odds;
                                        game.redSideTeamFtOdds = odds[i].team2odds;
                                        break;
                                    case 'fd':
                                        game.blueSideTeamFdOdds = odds[i].team1odds;
                                        game.redSideTeamFdOdds = odds[i].team2odds;
                                        break;
                                    case 'fbaron':
                                        game.blueSideTeamFbaronOdds = odds[i].team1odds;
                                        game.redSideTeamFbaronOdds = odds[i].team2odds;
                                        break;
                                }
                            }
                        }
                    }
                    ifNewGame = function (game) { return createGameUtils_1.isNewGame(game, gamesResponse.data); };
                    newGames = gamesToPost.filter(ifNewGame);
                    _c = 0, newGames_1 = newGames;
                    _d.label = 2;
                case 2:
                    if (!(_c < newGames_1.length)) return [3 /*break*/, 5];
                    newGame = newGames_1[_c];
                    return [4 /*yield*/, axios_1["default"].post(API_ROUTE + "/games", { game: newGame })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _c++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Done!');
                    return [2 /*return*/];
            }
        });
    });
}
main();
