const { app, BrowserWindow, Menu, shell, ipcMain} = require('electron');
const path = require('path');

const menuItems = [
    {
        label: "Menu",
        submenu: [
            {
                label: "About",
            },
        ],
    },
    {
        label: "File",
        submenu: [
            {
                label: "New Window",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 500,
                        width: 800,
                        show: false,
                        // backgroundColor: 'green',
                        // movable: false,
                    });

                win2.loadFile('index2.html');
                // win2.loadURL('https://ohmeng1984.github.io/webdevPort/');
                win2.once('ready-to-show', () => {
                    win2.show()
                })
                }
            },
            {
                label: "Open Camera",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 300,
                        width: 400,
                        show: false,
                        // backgroundColor: 'green',
                        // movable: false,
                        webPreferences: {
                            preload: path.join(__dirname, 'cameraPreload.js')
                        }
                    });

                ipcMain.on("close-window", () => {
                    win2.close();
                });

                // win2.webContents.openDevTools();
                win2.loadFile('camera.html');
                win2.once('ready-to-show', () => {
                    win2.show();
                })
                }
            },
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal('https://bitfumes.com')
                }
            },
            {
                type: "separator",
            },
            {
                label: "Exit",
                click: () => app.quit(),
            },
        ],
    },
    {
        label: "Window",
        submenu: [
            {
                role: 'close'
            },
        ],
    }
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        height: 500,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ipcMain.on("set-image", (event, data) => {
        win.webContents.send("get-image", data);
    });

    // win.webContents.openDevTools();
    win.loadFile('index.html')
};

app.whenReady().then(() => {
    createWindow();

});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
