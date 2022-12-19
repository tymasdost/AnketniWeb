const expandedButton = document.getElementById("header");
const sideMenu = document.getElementById("left-side-menu");
const container = document.getElementById("container");
const copy = document.getElementById("copy");
const menuwr = document.getElementById("menu-footer");
const menuText = document.getElementsByClassName("menu-text");
let menuType = true;
expandedButton.onclick = () => {
    expandedButton.style = `transition:1s`
    if (menuType) {
        sideMenu.style.width = "80px";
        container.style.marginLeft = "80px";
        [...menuText].forEach((text) => {
            text.style.transition = "0.4s ease-out";
            text.style.opacity = "0";
        })
        expandedButton.style.animation = 'rotate 1s'
        expandedButton.style.transform = `rotate(180deg)`
        copy.innerText = "TEAM ZIDLE"
        copy.classList.add('copy-small')
        menuwr.style.alignItems = "center";
    } else {
        sideMenu.style.width = "200px";
        container.style.marginLeft = "200px";
        [...menuText].forEach((text) => {
            text.style.transition = ".7s ease-in";
            text.style.opacity = "100";
        })
        expandedButton.style.animation = 'rotateBack 1s'
        expandedButton.style.transform = `rotate(0deg)`
        copy.innerHTML = "Made by<br>Team Zidle"
        copy.classList.remove('copy-small')
        menuwr.style.alignItems = "end";
    }

    menuType = !menuType;
}