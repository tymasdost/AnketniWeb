const info = document.getElementById("info");
const getAllBooksBtn = document.getElementById("getAllBooksBtn");
const getBookByIdBtn = document.getElementById("getBookByIdBtn");
const postBookBtn = document.getElementById("postBookBtn");
const putBookBtn = document.getElementById("putBookBtn");
const patchBookBtn = document.getElementById("patchBookBtn");
const deleteBookBtn = document.getElementById("deleteBookBtn");
const getBookByIdInput = document.getElementById("getBookByIdInput");
const postNameInput = document.getElementById("postNameInput");
const postYearInput = document.getElementById("postYearInput");
const putIdInput = document.getElementById("putIdInput");
const putNameInput = document.getElementById("putNameInput");
const putYearInput = document.getElementById("putYearInput");
const patchIdInput = document.getElementById("patchIdInput");
const patchNameInput = document.getElementById("patchNameInput");
const patchYearInput = document.getElementById("patchYearInput");
const deleteIdInput = document.getElementById("deleteIdInput");

const getAllBooksEvent = async() => {
    try {
        const res = await fetch("http://127.0.0.1:3000/book", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        const data = await res.json();
        info.innerHTML = "";
        data.books.map((book) => {
            info.innerHTML += `<p>id: ${book._id}</p>`;
            info.innerHTML += `<p>name: ${book.name}</p>`;
            info.innerHTML += `<p>year: ${book.year}</p>`;
            info.innerHTML += `<p>request: ${Object.values(book.request)}</p>`;
            info.innerHTML += `<p><br></p>`;
        });
    } catch (error) {
        info.innerText = error;
    }
};
getAllBooksBtn.onclick = getAllBooksEvent;

const getBookByIdEvent = async() => {
    try {
        const getBookByIdInputValue = getBookByIdInput.value;
        const res = await fetch(
            `http://127.0.0.1:3000/account/${getBookByIdInputValue}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );
        const data = await res.json();
        info.innerHTML = `<p>id: ${data._id}</p>`;
        info.innerHTML += `<p>name: ${data.name}</p>`;
        info.innerHTML += `<p>year: ${data.year}</p>`;
        info.innerHTML += `<p>request: ${Object.values(data.request)}</p>`;
    } catch (error) {
        info.innerHTML = `<p>Book not found!</p>`
    }
};
getBookByIdBtn.onclick = getBookByIdEvent;

const postBookEvent = async() => {
    try {
        const postNameInputValue = postNameInput.value;
        const postYearInputValue = postYearInput.value;
        const res = await fetch("http://127.0.0.1:3000/book", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                name: postNameInputValue,
                year: postYearInputValue,
            }),
        });
        const data = await res.json();
        info.innerHTML = `<p>Message: ${data.message}</p>`;
        info.innerHTML += `<p>Created book:</p>`;
        info.innerHTML += `<p>id: ${data.createdBook._id}</p>`;
        info.innerHTML += `<p>name: ${data.createdBook.name}</p>`;
        info.innerHTML += `<p>year: ${data.createdBook.year}</p>`;
        info.innerHTML += `<p>payload: ${Object.values(
      data.createdBook.payload
    )}</p>`;
    } catch (error) {
        info.innerText = postBookEvent;
    }
};
postBookBtn.onclick = postBookEvent;

const putBookEvent = async() => {
    try {
        const putIdInputValue = putIdInput.value;
        const putNameInputValue = putNameInput.value;
        const putYearInputValue = putYearInput.value;
        const res = await fetch(`http://127.0.0.1:3000/book/${putIdInputValue}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                name: putNameInputValue,
                year: putYearInputValue,
            }),
        });
        const data = await res.json();
        info.innerHTML = `<p>${Object.values(data)}</p>`;
    } catch (error) {
        info.innerText = error;
    }
};
putBookBtn.onclick = putBookEvent;

const patchBookEvent = async() => {
    try {
        const patchIdInputValue = patchIdInput.value;
        const patchNameInputValue = patchNameInput.value;
        const patchYearInputValue = patchYearInput.value;
        let body = [];
        if (patchNameInputValue.trim().length) {
            const nameProp = {
                propName: "name",
                value: patchNameInputValue,
            };
            body.push(nameProp);
        }
        if (patchYearInputValue.trim().length) {
            const yearProp = {
                propName: "year",
                value: patchYearInputValue,
            };
            body.push(yearProp);
        }
        const res = await fetch(`http://127.0.0.1:3000/book/${patchIdInputValue}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(body)
        });
        const data = await res.json();
        info.innerHTML = `<p>Message: ${data.msg}</p>`;
        info.innerHTML += `<p>Request: ${Object.values(data.request)}</p>`;
    } catch (error) {
        info.innerText = error;
    }
};
patchBookBtn.onclick = patchBookEvent;

const deleteBookEvent = async() => {
    try {
        const deleteIdInputValue = deleteIdInput.value;
        const res = await fetch(
            `http://127.0.0.1:3000/book/${deleteIdInputValue}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            }
        );
        const data = await res.json();
        if (!data) return info.innerHTML = `<p>Book not found!</p>`;
        info.innerHTML = `<p>${Object.values(data)}</p>`;
    } catch (error) {
        info.innerText = error;
    }
};
deleteBookBtn.onclick = deleteBookEvent;