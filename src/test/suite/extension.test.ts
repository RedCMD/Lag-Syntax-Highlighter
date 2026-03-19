import * as vscode from 'vscode';
import assert from 'assert';
// import Mocha from 'mocha'; // TODO: Can't get it to work in both VSCode NodeJS and VSCode Web

const updateTests = process.env.updateTests === "true" ? true : false;
const runTests = !updateTests;

export function sleep(milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

suite('Extension Tests', async () => {
	if (runTests) {
		console.log("Start the tests!");
		vscode.window.showInformationMessage("Start the tests!");
	}
	else {
		console.log("Update the tests!");
		vscode.window.showInformationMessage("Update the tests!");
	}

	const workspaceFolders = vscode.workspace.workspaceFolders;
	assert.ok(Array.isArray(workspaceFolders));
	// Because TypeScript broken. https://github.com/microsoft/TypeScript/issues/17002
	const workspaceFolder = (workspaceFolders as readonly vscode.WorkspaceFolder[]).at(0);
	assert.ok(workspaceFolder);

	test('sleep()', async () => {
		const time = 50;
		const start = performance.now();
		await sleep(time);
		const end = performance.now();
		const duration = end - start;
		assert.ok(
			duration < 100 && duration > 0,
			`sleep(${time}); took: ${duration.toFixed(3)}ms`
		);
	});

	// TODO:
	// _executeFormatOnTypeProvider
	// _executeFormatRangeProvider
	// _executeHoverProvider_recursive
	// _executePrepareCallHierarchy
	// _executeProvideIncomingCalls
	// _executeProvideOutgoingCalls
	// _executeReferenceProvider_recursive
	// _executeReferenceProvider
	// _executeSelectionRangeProvider

	// test('TextMate', async () => {
	// 	const uri = vscode.Uri.joinPath(fixturesUri, 'JSON.tmLanguage.json');
	// 	const editor = await vscode.window.showTextDocument(uri, showTextDocumentOptions);
	// 	const tokens = await vscode.commands.executeCommand('_workbench.captureSyntaxTokens', uri);
	// 	vscode.window.showInformationMessage(JSON.stringify(tokens));
	// });


	// test('sleep', async () => {
	// 	await sleep(10000);
	// });
});

// console.log(JSON.stringify(variable));
