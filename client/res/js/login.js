const emailInput = document.getElementById(`email`);
const pswdInput = document.getElementById(`password`);
const emailError = document.getElementById(`emailError`);
const pswdError = document.getElementById(`pswdError`);
const signIn = document.getElementById(`loginBtn`);
const rememberLogin = document.getElementById(`checkbox`);

if (Cookies.get('rmbr')) window.location.replace("http://127.0.0.1:5500/client/home.html");

const checkInputs = () => {
    let temp = true;
    pswdError.innerText = "";
    emailError.innerText = "";
    if (emailInput.value == "" || (!emailInput.value.includes("@student.spsmb.cz") && !emailInput.value.includes("@spsmb.cz"))) {
        emailError.innerText = "*Špatně zadaný email";
        temp = false;
    }
    if (pswdInput.value == "") {
        pswdError.innerText = "*Musíte zadat heslo";
        temp = false;
    }
    return temp;
}

const getAccountByEmail = async() => {
    try {
        const getAccountByEmailInputValue = emailInput.value;
        const res = await fetch(
            `http://127.0.0.1:3000/account/${getAccountByEmailInputValue}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        const data = await res.json();
        if (data.email === undefined) {
            emailError.innerText = "*Špatně zadaný Email";
            return false;
        } else if (data.password != pswdInput.value) {
            pswdError.innerText = "*Špatně zadané Heslo";
            return false;
        }

        Cookies.set('group', `${data.group}`);
        Cookies.set('_id', `${data._id}`, {path:"./server/node_modules/js-cookie/dist/js.cookie.mjs"});
        Cookies.set('test', `zmrde`, {domain:'http://localhost:5500/client/team.html'});

        if (rememberLogin.checked) Cookies.set('rmbr', `true`);
        else Cookies.set('rmbr', `false`);

        window.location.replace("http://127.0.0.1:5500/client/home.html");

    } catch (error) {
        res.status(500).json({
            error: error,
        });
    }
};


loginBtn.onclick = () => {

    if (checkInputs()) {
        getAccountByEmail();
    }

}