const electron = require("electron")
const ipc = electron.ipcRenderer


const minimize = () => { ipc.send("minimize") }
const maximize = () => { ipc.send("maximize") }
const quit = () => { ipc.send("close") }