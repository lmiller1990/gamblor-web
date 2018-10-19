"use strict";
exports.__esModule = true;
function removeDupMatches(matches) {
    var foundMatchesIndexes = [];
    var foundMatches = [];
    var i = 0;
    var _loop_1 = function (match) {
        // @ts-ignore
        var matchValues = Object.keys(match).map(function (x) { return match[x]; }).join(",");
        var included = foundMatches.indexOf(matchValues);
        if (included < 0) {
            foundMatches.push(matchValues);
            foundMatchesIndexes.push(i);
        }
        i += 1;
    };
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        _loop_1(match);
    }
    return matches.filter(function (_, idx) { return foundMatchesIndexes.indexOf(idx) >= 0; });
}
exports.removeDupMatches = removeDupMatches;
