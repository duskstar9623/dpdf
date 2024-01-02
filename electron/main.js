const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        // Hide menu bar
        autoHideMenuBar: true,
        // Expose Node API to rendering process
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js')
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(process.cwd(), 'resources/logo.png')
    });

    if(process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://127.0.0.1:9623');
        mainWindow.webContents.openDevTools();
    }else if(process.env.NODE_ENV === 'production') {
        mainWindow.loadFile(path.resolve(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})
