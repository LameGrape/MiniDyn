const nodes = document.getElementsByTagName("node-title")

var mouseMove = { x: 0, y: 0 }
var focusedNode = null;

Array.from(nodes).forEach(node => {
    node.addEventListener("mousedown", () => {
        focusedNode = node.parentElement
    })
})

function curveToPoint(svg, x, y, startX, startY) {
    svg.children[0].setAttribute("d", `M${startX} ${startY} C ${x} ${startY}, ${startX} ${y}, ${x} ${y}`)
}

document.onmousemove = function(e) {
    curveToPoint(document.getElementsByClassName("connection")[0], e.clientX, e.clientY, 300, 300)
    if (!focusedNode) return
    mouseMove = { x: e.movementX, y: e.movementY }
    focusedNode.style.left = parseInt(focusedNode.style.left.replace("px", "")) + mouseMove.x + "px"
    focusedNode.style.top = parseInt(focusedNode.style.top.replace("px", "")) + mouseMove.y + "px"
}
document.onmouseup = () => focusedNode = null