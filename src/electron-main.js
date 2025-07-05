const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Apenas recarrega em modo desenvolvimento
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'favicon.ico'), // Atualizado
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'index.html')); // Atualizado
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC para ping de IP
ipcMain.handle('ping-pdv', async (event, ip) => {
  return new Promise((resolve) => {
    const isWindows = process.platform === 'win32';
    const command = isWindows
      ? `ping -n 1 -w 500 ${ip}`
      : `ping -c 1 -W 1 ${ip}`;
    
    exec(command, (error, stdout, stderr) => {
      resolve(!error);
    });
  });
});
