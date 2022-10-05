const canvas = document.getElementById("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

ctx.font = "900 200pt kingthings"
ctx.fillStyle = "#C3D1D8"
ctx.strokeStyle = "#8EA6B2"
ctx.lineWidth = 10
ctx.lineCap = "round"
ctx.lineJoin = "round"

ctx.fillText("p", 30, 300)
ctx.strokeText("p", 30, 300)

ctx.fillStyle = "#38ACFF"
ctx.strokeStyle = "#2F92D8"

ctx.fillText("2", 30 + ctx.measureText("p").width, 300)
ctx.strokeText("2", 30 + ctx.measureText("p").width, 300)