const nodes = document.getElementsByTagName("node-title")
const nodeout = document.getElementsByTagName("node-output")
const nodein = document.getElementsByTagName("node-input")

var mouseMove = { x: 0, y: 0 }
var focusedNode = null;
var focusedPut = null;
const svgs = []

Array.from(nodes).forEach(node => {
    node.addEventListener("mousedown", () => {
        focusedNode = node.parentElement
    })
})

Array.from(nodeout).forEach((node, i) => {
    node.setAttribute("index", i)
    node.addEventListener("mousedown", () => {
        focusedPut = node
    })
})

Array.from(nodein).forEach((node, i) => {
    node.setAttribute("index", i)
    node.addEventListener("mousedown", () => {
        focusedPut = node
    })
})

function curveToPoint(svg, x, y, startX, startY) {
    svg.style.left = Math.min(x, startX) - 5
    svg.style.top = Math.min(y, startY) - 5
    svg.setAttribute("width", Math.abs(startX - x) + 10)
    svg.setAttribute("height", Math.abs(startY - y) + 10)
    let nx = x - svg.getBoundingClientRect().x
    let ny = y - svg.getBoundingClientRect().y
    let sx = Math.max(5, startX - svg.getBoundingClientRect().x)
    let sy = Math.max(5, startY - svg.getBoundingClientRect().y)
    svg.children[0].setAttribute("d", `M${sx} ${sy} C ${nx} ${sy}, ${sx} ${ny}, ${nx} ${ny}`)
}

const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

document.onmousemove = function(e) {
    svgs.forEach(item => {
        if(!item.getAttribute("target")) return
        if(item.getAttribute("was") == "NODE-OUTPUT"){
            let target = Array.from(nodein).find(itm => itm.getAttribute("index") == item.getAttribute("target"))
            let start = Array.from(nodeout).find(itm => itm.getAttribute("index") == item.getAttribute("index"))
            if(target != undefined && start != undefined){
                let rect = start.getBoundingClientRect()
                let tarRect = target.getBoundingClientRect()
                curveToPoint(item, tarRect.x, tarRect.y + tarRect.height / 2, rect.x + rect.width, rect.y + rect.height / 2)
            }
        }
        else{
            let target = Array.from(nodeout).find(itm => itm.getAttribute("index") == item.getAttribute("target"))
            let start = Array.from(nodein).find(itm => itm.getAttribute("index") == item.getAttribute("index"))
            if(target != undefined && start != undefined){
                let rect = start.getBoundingClientRect()
                let tarRect = target.getBoundingClientRect()
                curveToPoint(item, tarRect.x + tarRect.width, tarRect.y + tarRect.height / 2, rect.x, rect.y + rect.height / 2)
            }
        }
    })

    if (focusedNode) {
        mouseMove = { x: e.movementX, y: e.movementY }
        focusedNode.style.left = parseInt(focusedNode.style.left.replace("px", "")) + mouseMove.x + "px"
        focusedNode.style.top = parseInt(focusedNode.style.top.replace("px", "")) + mouseMove.y + "px"
    }
    if (focusedPut) {
        var svg

        if (!svgs.some((item) => item.getAttribute("index") == focusedPut.getAttribute("index") && item.getAttribute("was") == focusedPut.tagName)) {
            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg.innerHTML = `<path d="" stroke="var(--var${capitalize(focusedPut.getAttribute("type"))})"/>`
            svg.setAttribute("index", focusedPut.getAttribute("index"))
            svg.setAttribute("width", "0")
            svg.setAttribute("height", "0")
            svg.setAttribute("was", focusedPut.tagName)
            svg.classList.add("connection")
            svg.style = "left: 0px; top: 0px;"
            document.getElementById("svgs").appendChild(svg)
            svgs.push(svg)
        } else {
            svg = svgs.find((item) => item.getAttribute("index") == focusedPut.getAttribute("index") && item.getAttribute("was") == focusedPut.tagName)
        }
        let rect = focusedPut.getBoundingClientRect()
        curveToPoint(svg, e.clientX, e.clientY, rect.x + rect.width, rect.y + rect.height / 2)
    }
}
document.onmouseup = (e) => {
    focusedNode = null

    if(focusedPut){
        let svg = svgs.find((item) => item.getAttribute("index") == focusedPut.getAttribute("index") && item.getAttribute("was") == focusedPut.tagName)
        let target = document.elementsFromPoint(e.clientX, e.clientY).find(item => item.getAttribute("type") != null && item.getAttribute("index") != null)
        if(target != null
            && target.tagName != focusedPut.tagName
            && target.getAttribute("type") == focusedPut.getAttribute("type")
            && target.parentElement != focusedPut.parentElement){
            svg.setAttribute("target", target.getAttribute("index"))
        }
        else{
            svgs.splice(svgs.indexOf(svg), 1)
            document.getElementById("svgs").removeChild(svg)
        }
    }

    focusedPut = null
}