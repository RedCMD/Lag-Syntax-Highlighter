"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");

async function activate(context) {
	vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));
}

exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage(JSON.stringify("deactivate"));
	// https://github.com/microsoft/vscode/issues/105484
	// https://github.com/microsoft/vscode/issues/201664
}
exports.deactivate = deactivate;
