const emailInput = document.getElementById(`email`);
const pswdInput = document.getElementById(`password`);
const emailError = document.getElementById(`emailError`);
const pswdError = document.getElementById(`pswdError`);
const signIn = document.getElementById(`loginBtn`);


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

    } catch (error) {
        console.log(error);
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