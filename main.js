const { app } = require("electron")
const electron = require("electron")

function createWindow(file, options) {
    const window = new electron.BrowserWindow(options)
    window.loadFile(file)
}

app.whenReady().then(() => {
    createWindow("src/index.html", {
        width: 1600,
        height: 900
    })
})

app.on("window-all-closed", () => {
    app.quit()
})