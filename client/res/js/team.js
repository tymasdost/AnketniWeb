const addProblem = document.getElementById("add-problem");
const problemCreator = document.getElementById("problem-creator");
const problemName = document.getElementById("problem-name");
const problemDesc = document.getElementById("problem");
const submitProblem = document.getElementById("submit-problem");
const content = document.getElementById("container");

let queryString = window.location.search;
queryString = queryString.slice(1);
console.log(queryString);

// show creator

addProblem.onclick = ()=>{
    if (addProblem.innerText == '+') {
        problemCreator.style.transform = "scaleX(1)"
        addProblem.innerText = "-"
    } else {
        problemCreator.style.transform = "scaleX(0)"
        addProblem.innerText = "+"
    }
    
}

const patchProblemEvent = async() => {
    try {
        const patchIdInputValue = '63b8ae1281fca13c41cc7991';
        const patchUpvoteInputValue = 1;
        let body = [];
        
            const nameProp = {
                propName: "upvote",
                value: patchUpvoteInputValue,
            };
            body.push(nameProp);
        
        const res = await fetch(`http://127.0.0.1:3000/problem/${patchIdInputValue}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(body)
        });
        const data = await res.json();
        console.log(`<p>Message: ${data.msg}</p>`)
        console.log(`<p>Request: ${Object.values(data.request)}</p>`)

    } catch (error) {
        console.log(error)
    }
};
  


const getAllProblemsEvent = async() => {
    try {
        const res = await fetch(`http://127.0.0.1:3000/problem/${queryString}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        const data = await res.json();
        data.problems.map((problem) => {
            content.innerHTML += `
            <div class="problem-layout">
                    <div class="left">
                        <div class="top">
                            <div class="name">${problem.name}</div>
                        </div><br>
                        <div class="bottom">
                            <div class="desc">${problem.description}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="ranking"><button onclick="patchProblemEvent('${problem._id}',1)">UP</button>${problem.upvote}<span onclick="patchProblemEvent('${problem._id}',-1)>DOWN</span></div>
                    </div>
                </div>
            `
        });
    } catch (error) {
        console.log(error)
    }
};

const postProblemEvent = async() => {
    try {
        const problemNameValue = problemName.value;
        const problemDescValue = problemDesc.value;
        const problemGroupValue = queryString;
        const res = await fetch("http://127.0.0.1:3000/problem", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                name: problemNameValue,
                description: problemDescValue,
                group: problemGroupValue,
                upvote: 0,
            }),
        });
        
        const data = await res.json();
        
            content.innerHTML += `
            <div class="problem-layout">
                    <div class="left">
                        <div class="top">
                            <div class="name">${data.createdProblem.name}</div>
                        </div><br>
                        <div class="bottom">
                            <div class="desc">${data.createdProblem.description}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="ranking"><span>UP</span>${data.createdProblem.upvote}<span>DOWN</span></div>
                    </div>
                </div>
            `
        ;
    } catch (error) {
        console.log(postProblemEvent)
    }
};

submitProblem.onclick = postProblemEvent;



window.onload = ()=> {
    getAllProblemsEvent();
}


