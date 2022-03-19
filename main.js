const { app, BrowserWindow } = require('electron');
function createWindow(){
  const win = new BrowserWindow(
    {
      width: 1366,
      height: 738
    }
  )
  win.loadFile(__dirname + "/dist/Autoskola/index.html");
}
app.whenReady().then(() => {
  createWindow()
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

