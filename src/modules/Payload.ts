import { mkdirSync, readdirSync, existsSync } from "fs";

module.exports.ZauRun = (mainWindow: any, _electron: any, _mainScreen: any, extraLinks: any) => {
    const lib = {
        getPopoutWindowByKey: (key: string) => {
            return _mainScreen.getAllPopoutWindows().find((w: any) => w.key === key);
        },
        getAllPopoutWindows: () => {
            return _mainScreen.getAllPopoutWindows();
        },
        setNewWindowEvent: (event: any) => {
            _mainScreen.setNewWindowEvent(event);
        },

        "electron": _electron,
        "mainScreen": _mainScreen,
        "mainWindow": mainWindow,
        "execInContext": (code: string) => {
            mainWindow.webContents.executeJavaScript(code);
        },

        "notify": (title: string, content: string) => {
            new _electron.Notification({title: title, body: content}).show();
        }
    }
    
    !existsSync("../plugins") && mkdirSync("../plugins")
    let plugins = readdirSync("../plugins")
    for (const plugin of plugins) {
        try {
            require(__dirname + "/../../../../../../plugins/" + plugin).execute(lib);
        } catch (e) {
            lib.notify("Plugin Error", `Failed to load plugin ${plugin}`);
            console.error("FAILED TO LOAD PLUGIN", e)
        }
    }

    console.log("Zau injected & ran successfully!")
}