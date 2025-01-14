import * as vscode from "vscode";

import * as vscodelc from "vscode-languageclient/node";

import { printToExtentionChannel } from "./extention_utils";

import { serverOptions } from "./server_utils";

export let languageClient: vscodelc.LanguageClient;

function createOptions(): vscodelc.LanguageClientOptions {
    return {
        documentSelector: [{ scheme: "file", language: "python" }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher("**/.py"),
        },
    };
}

export async function initializeLanguageClient() {
    printToExtentionChannel(`Initialization of language client`);

    try {
        languageClient = new vscodelc.LanguageClient(
            "llmExtentionLanguageClient",
            "LLM extention language client",
            serverOptions,
            createOptions()
        );

        await languageClient.start();
        printToExtentionChannel(`Language client connected to Jedi LS`);
    } catch (exception) {
        printToExtentionChannel(
            `Failed to connect language client to Jedi LS: ${exception}`
        );
    }
}
