'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    
    let disposable = vscode.commands.registerCommand('extension.setReminder', () => {

        // Message InputBox options
        let messageOptions = {
            prompt: 'Enter your message',
            placeHolder: 'Message...'
        }

        // Show the message InputBox to the user
        vscode.window.showInputBox(messageOptions).then(message => {

            // Timer InputBox options
            let timerOptions = {
                prompt: 'When should I remind you?',
                placeHolder: 'Enter time in minutes',
                validateInput: validateTimerInput
            };
    
            // Show the timer InputBox to the user
            vscode.window.showInputBox(timerOptions).then(minutes => {
    
                // Convert minutes to milliseconds
                let milliseconds = parseInt(minutes) * 60000;
                
                // Start the timer
                setTimeout(function() {

                    // Show the message to the user
                    vscode.window.showInformationMessage(message);
                }, milliseconds);
            });
        });

        // Validate the value of the timer InputBox
        function validateTimerInput(value) {
            value = parseInt(value);
            if (isNaN(value)) {
                return 'Minutes must be a number';
            } else {       
                return null;
            }
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}