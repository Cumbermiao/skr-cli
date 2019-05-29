const addAction = require('./add');
const deleteAction = require('./delete');
const lsAction = require('./ls');
const initAction = require("./init");
const defaultAction = require("./setDefault");

module.exports = {
    addAction,
    deleteAction,
    lsAction,
    initAction,
    defaultAction
}