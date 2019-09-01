import * as vscode from 'vscode';

class Command {
  id: number;
  terminal: vscode.Terminal | undefined;
  cmd: string;
  force: boolean;

  constructor(id: number, terminal: vscode.Terminal | undefined, force: boolean, cmd: string) {
    this.id = id;
    this.terminal = terminal;
    this.force = force;
    this.cmd = cmd;
  }

  execute() {
    vscode.commands.executeCommand('workbench.action.terminal.focus');

    if (!this.terminal || this.force) {
      this.terminal = vscode.window.createTerminal({ name: `Touch Bar Commands ${this.id}`});
    }
    this.terminal.show(true);
    this.terminal.sendText(this.cmd ? this.cmd : `echo "Error: no command specified for command ${this.id}"`);
  }

  update(e: vscode.ConfigurationChangeEvent) {
    const f =`touch-bar-commands.force.cmd${this.id}`;
    const a =`touch-bar-commands.activate.cmd${this.id}`;
    const c =`touch-bar-commands.command.${this.id}`;

    if (e.affectsConfiguration(f)) {
      this.force = vscode.workspace.getConfiguration().get(f, false);
    }
    if (e.affectsConfiguration(a)) {
      this.force = vscode.workspace.getConfiguration().get(a, false);
    }
    if (e.affectsConfiguration(c)) {
      this.force = vscode.workspace.getConfiguration().get(c, false);
    }
  }
}

export default Command;
