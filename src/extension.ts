import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const commandNo = [1,2,3,4];
	context.subscriptions.push(...commandNo.map((no): vscode.Disposable => {
		return vscode.commands.registerCommand(
			`touch-bar-commands.execute.cmd${no}`,
			() => {
				const conf = vscode.workspace.getConfiguration();
				vscode.commands.executeCommand('workbench.action.terminal.focus');
				let terminal = vscode.window.activeTerminal;
				if (!terminal) {
					terminal = vscode.window.createTerminal({ name: 'Touch Bar Commands' });
					terminal.show(true);
				}
				const cmd = conf.get<string>(`touch-bar-commands.command.${no}`);
				terminal.sendText(cmd ? cmd : `echo "Error: no command specified for command ${no}"`);
			}
		);
	}));
}

export function deactivate() {}
