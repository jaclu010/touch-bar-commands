import * as vscode from 'vscode';
import Command from './command';

export function activate(context: vscode.ExtensionContext) {
	const numCommands = 4;
	const conf = vscode.workspace.getConfiguration();
	const terminal = vscode.window.activeTerminal;

	for (let num = 1; num <= numCommands; num++) {
		let cmd = new Command(
			num,
			terminal,
			conf.get<boolean>(`touch-bar-commands.force.cmd${num}`, false),
			conf.get<string>(`touch-bar-commands.command.${num}`, '')
		);

		context.subscriptions.push(vscode.commands.registerCommand(
			`touch-bar-commands.execute.cmd${num}`, () => cmd.execute()
		));

		context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(
			e => cmd.update(e)
		));
	}
}

export function deactivate() {}
