const	electron	=	require('electron');

const	{app}	=	electron;
const	{BrowserWindow}	=	electron;
const {ipcMain} = electron;

let	win;

function createWindow() {
		win	=	new	BrowserWindow({
			width:	800,
			height:	600,
			frame: false,
		});
		win.loadURL(`file://${__dirname}/app/index.html`);
		win.webContents.openDevTools();
		win.on('closed',	()	=>	{
				win	=	null;
		});
}

app.on('ready',	createWindow);

app.on('window-all-closed',	()	=>	{
		if (process.platform	!==	'darwin')	{
			app.quit();
		}
});

app.on('activate',	()	=>	{
		if (win	===	null)	{
			createWindow();
		}
});

ipcMain.on('close', (event, arg) => {
		app.quit();
});
