/**
 * A module for Memory game brain.
 *
 * @module
 */
"use strict";

class Gamebrain {
    /**
     * @constructor
     */
    constructor() {
        this.colors = [
            "blackplayer",
            "redplayer",
            "blueplayer",
            "greenplayer",
            "pinkplayer",
            "orangeplayer",
            "yellowplayer",
            "limegreenplayer",
            "purpleplayer"
        ];
        this.usedcolors = [];
        this.players = new Map();
        this.playerturn = 0;
    }

    /**
    * Adding player to Map (nickname, colorclass)
    *
    * @param {string} player - uniqified nickname
    * @param {string} color - color class for that player
    */
    addPlayer(player, color) {
        this.players.set(player, color);
    }

    setActivePlayer(firstround = false) {
        if (firstround) {
            var players = this.getPlayersNicks();

            this.playerturn = Math.floor(Math.random() * players.length);
        } else {
            this.playerturn += 1;
        }
    }

    dropPlayer(player) {
        this.players.delete(player);
        // console.log("Players (accroding to GameBrain)");
        // console.log(this.players);
    }

    /**
    * Decide unique color for 'player' and add player to player Map
    *
    * @param {string} player - nickname of player to add to game
    *
    * @return {string} colorclass for player
    */
    setPlayerColor(player) {
        var color = "blackplayer";
        var notuniquecolor = true;

        while (notuniquecolor) {
            color = this.colors[Math.floor(Math.random() * this.colors.length)];
            if (this.usedcolors.indexOf(color) === -1) {
                notuniquecolor = false;
                this.usedcolors.push(color);
                this.addPlayer(player, color);
            }
        }
        return color;
    }

    /**
    * Takes a nickname and add a figure to make nickname unique.
    *
    * @param {string} incomingnickname, from new user.
    *
    * @return {string} unique nickname.
    */
    uniquifyname(incomingnickname) {
        var incomingnicknamelength = incomingnickname.length;
        var stringdiff;
        var users = this.getPlayersNicks();
        var counter = 2;

        // while(users.indexOf(incomingnickname) !== -1) {
        while (users.indexOf(incomingnickname) !== -1) {
            if (incomingnickname.length == incomingnicknamelength) {
                incomingnickname = incomingnickname + counter;
            } else {
                stringdiff = incomingnickname.length - incomingnicknamelength;
                incomingnickname = incomingnickname.slice(0, -stringdiff);
                incomingnickname = incomingnickname + counter;
            }
            counter++;
        }
        return incomingnickname;
    }

    getPlayersNicks() {
        return [...this.players.keys()];
    }

    getPlayersColors() {
        return [...this.players.values()];
    }
}

// Export module
module.exports = Gamebrain;
