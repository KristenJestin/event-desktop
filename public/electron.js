const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow, backgroundWindow

// require("update-electron-app")({
//   repo: "kitze/react-electron-example",
//   updateInterval: "1 hour"
// });

function createMainWindow() {
	const win = new BrowserWindow({
		width: 900,
		height: 680,
		minWidth: 400,
		minHeight: 400,
		webPreferences: { nodeIntegration: true }
	})
	win.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)
	win.on('closed', onClosed)

	return win
}

function createBackgroundWindow() {
	const win = new BrowserWindow({
		show: false,
		webPreferences: { nodeIntegration: true }
	})
	win.loadURL(`file://${path.join(__dirname, 'background.html')}`)

	return win
}


function onClosed() {
	mainWindow = null
	backgroundWindow = null
}


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	backgroundWindow = createBackgroundWindow();
});

ipcMain.on('event-test', (event, payload) => mainWindow.webContents.send('event-test', payload));
ipcMain.on('event-send', (event, payload) => backgroundWindow.webContents.send('event-send', payload));
