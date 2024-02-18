/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initTokenColorCustomizations = void 0;
const vscode = __webpack_require__(2);
// type _object_ = { [key: string]: any };
function initTokenColorCustomizations(context) {
	vscode.window.showInformationMessage(JSON.stringify("tokenColorCustomizations"));
    const activeDocument = vscode.window.activeTextEditor?.document; // `activeTextEditor` can be `undefined`!
    update(packageJSON(activeDocument) || jsonTextMate(activeDocument));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        vscode.window.showInformationMessage(JSON.stringify("active"));
        const document = editor?.document; // `editor` can be `undefined`!
        update(packageJSON(document) || jsonTextMate(document));
    }));
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        vscode.window.showInformationMessage(JSON.stringify("open"));
        if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
            update(packageJSON(document) || jsonTextMate(document));
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((edits) => {
        vscode.window.showInformationMessage(JSON.stringify("change"));
        vscode.window.showInformationMessage(JSON.stringify(edits));
        if (edits.contentChanges.length == 0) {
            return;
        }
        const document = edits.document;
        vscode.window.showInformationMessage(JSON.stringify("document"));
        vscode.window.showInformationMessage(JSON.stringify(document));
        if (vscode.languages.match(packageJSONSelector, document)) {
            vscode.window.showInformationMessage(JSON.stringify("match"));
            if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
                vscode.window.showInformationMessage(JSON.stringify("active"));
                vscode.window.showInformationMessage(JSON.stringify(vscode.window.activeTextEditor));
                update(packageJSON(document));
            }
        }
    }));
    // context.subscriptions.push(
    // 	vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    // 		// vscode.window.showInformationMessage(JSON.stringify("config"));
    // 		if (event.affectsConfiguration("editor.tokenColorCustomizations")) {
    // 			const document = vscode.window.activeTextEditor?.document; // `activeTextEditor` can be `undefined`!
    // 			update(packageJSON(document) || jsonTextMate(document));
    // 		}
    // 	})
    // );
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument((document) => {
        vscode.window.showInformationMessage(JSON.stringify("close"));
        if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
            update(null);
        }
    }));
}
exports.initTokenColorCustomizations = initTokenColorCustomizations;
const packageJSONSelector = { pattern: "**/package.json", scheme: "file" };
const jsonTextMateSelector = { language: "json-textmate", scheme: "file" };
// const documentSelector: vscode.DocumentSelector = [packageJSONSelector, jsonTextMateSelector];
function packageJSON(document) {
    vscode.window.showInformationMessage(JSON.stringify("packageJSON"));
    if (!document) {
        return null;
    }
    // if (vscode.languages.match(packageJSONSelector, document)) {
        const uri = document.uri;
        return uri;
    // }
}
function jsonTextMate(document) {
    vscode.window.showInformationMessage(JSON.stringify("jsonTextMate"));
    if (!document) {
        return null;
    }
    if (vscode.languages.match(jsonTextMateSelector, document)) {
        const uri = vscode.Uri.joinPath(document.uri, '../../package.json');
        return uri;
    }
}
let ignoreFailParse = false;
const bak = '[tokenColorCustomizations_bak_JSON_TextMate'; // The square bracket is there on purpose so that the json `settings` schema doesn't complain about it
async function update(uri) {
    vscode.window.showInformationMessage(JSON.stringify("update"));
    // Workspace settings have higher priority than Global settings. But... Workspace settings don't work when there is no Workspace
    const configurationTarget = vscode.workspace.name ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
    const configurationValue = vscode.workspace.name ? 'workspaceValue' : 'globalValue';
    if (uri) {
        try {
            const packageDocument = await vscode.workspace.openTextDocument(uri);
            vscode.window.showInformationMessage(JSON.stringify(packageDocument));
            const packageParsed = await JSON.parse(packageDocument?.getText());
            const package_tokenColorCustomizations = packageParsed?.contributes?.configurationDefaults?.['editor.tokenColorCustomizations'];
            if (package_tokenColorCustomizations) {
                const editor = vscode.workspace.getConfiguration("editor");
                const tokenColorCustomizations = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
                const tokenColorCustomizations_bak = tokenColorCustomizations[bak] ?? tokenColorCustomizations;
                delete tokenColorCustomizations_bak[bak];
                package_tokenColorCustomizations[bak] = tokenColorCustomizations_bak;
                editor.update("tokenColorCustomizations", package_tokenColorCustomizations, configurationTarget);
                return;
            }
        }
        catch (error) {
            if (ignoreFailParse == false) {
                const message = `Failed to parse package.json:\n${error}`;
                const ignore = "Ignore";
                vscode.window.showWarningMessage(message, ignore).then((value) => {
                    if (value == ignore) {
                        ignoreFailParse = true;
                    }
                    return true;
                });
            }
        }
    }
    const editor = vscode.workspace.getConfiguration("editor");
    const tokenColorCustomizations = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
    const tokenColorCustomizations_bak = tokenColorCustomizations[bak];
    if (tokenColorCustomizations_bak !== undefined) {
        const length = Object.keys(tokenColorCustomizations_bak).length;
        editor.update("tokenColorCustomizations", length ? tokenColorCustomizations_bak : undefined, configurationTarget);
    }
}


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const tokenColorCustomizations_1 = __webpack_require__(1);
function activate(context) {
    (0, tokenColorCustomizations_1.initTokenColorCustomizations)(context);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;