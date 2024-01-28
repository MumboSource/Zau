import fs, { unlinkSync } from "fs";
import path from "path";
import { killDiscord } from "./Utilities";
import { extractAll, createPackage } from "@electron/asar"
import { tmpdir } from "os";

const CALL_ARGS = ["_electron.BrowserWindow.fromId(mainScreen.getMainWindowId())", "_electron", "mainScreen", 
    `{${["getPopoutWindowByKey", "getAllPopoutWindows", "setNewWindowEvent"].join(",")}}`
].join(",");

const PATCHES = [
    {
        file: "app/index.js",
        from:  "} = require('./popoutWindows');",
        to: `} = require('./popoutWindows');\nconst { ZauRun } = require('./_zau');ZauRun(${CALL_ARGS});`
    }
]

export class Injector {

    private asarPath: string;

    constructor(path: string) {
        if(!path){
            throw new Error('Path is required to inject...');
        }
        
        this.asarPath = path;
        this.inject();
    }

    private async inject(): Promise<void> {
        killDiscord();
        
        const extractedPath = path.join(tmpdir(), "zau");
        if (!fs.existsSync(extractedPath)) fs.mkdirSync(extractedPath);
        
        extractAll(this.asarPath, extractedPath);
        for (const patch of PATCHES) {
            let data = fs.readFileSync(path.join(extractedPath, patch.file)).toString();
            data = data.replaceAll(patch.from, patch.to);
            fs.writeFileSync(path.join(extractedPath, patch.file), data);
        }

        // add the payload in a file called _zau.js
        fs.copyFileSync(__dirname + "\\Payload.js", path.join(extractedPath + "\\app", "_zau.js"))

        unlinkSync(this.asarPath);
        createPackage(extractedPath, this.asarPath);
    }
}