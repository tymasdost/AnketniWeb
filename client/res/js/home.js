const container = document.getElementById("container");
const delcook = document.getElementById("deletecookie");



delcook.onclick = () => {
    Cookies.remove('rmbr')
    Cookies.remove('_id')
}


// Room Loading
const getAllTeamsEvent = async() => {
    try {
        const res = await fetch(`http://127.0.0.1:3000/team/${Cookies.get('group')}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        const data = await res.json();
        data.teams.map((team) => {
            container.innerHTML +=
                `
            <div class="team-wrapper">
                <div class="team-image"><i class="${team.icon}"></i></div>
                <div class="name">${team.name} <br><div class="group">${team.group}</div></div>
                <a href="http://localhost:5500/client/team.html?${team._id}" class="enter">Vstoupit</a>
            </div>
            `;
        });
    } catch (error) {
        info.innerText = error;
    }
};

window.onload = () => {
    getAllTeamsEvent();
}