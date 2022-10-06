const canvas = document.getElementById("canvas")
    /** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

ctx.font = "900 200pt kingthings"
ctx.fillStyle = "#C3D1D8"

ctx.fillText("p", 30, 300)

ctx.fillStyle = "#38ACFF"

ctx.fillText("n", 30 + ctx.measureText("p").width, 300)