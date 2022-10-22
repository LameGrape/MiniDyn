const tabs = document.getElementsByTagName("tab")
var selectedTab

function tabSelect(tab) {
    if (selectedTab != null) selectedTab.classList.remove("selected")
    tab.classList.add("selected")
    selectedTab = tab
}