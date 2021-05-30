async function getPrograms() {
    let response = await fetch('/api/programs', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    console.log(data)
    let programs = document.getElementById("programs")
    for (let i = 0; i < response.length; i++) {
        let pg = document.createElement("option")
        pg.innerHTML = response[i];
        programs.appendChild(pg);
    }
}

async function getGraduationYear() {
    let response = await fetch('/api/graduationYears', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    console.log(data)
    let graduationYear = document.getElementById("graduationYears")
    for (let i = 0; i < response.length; i++) {
        let gy = document.createElement("option")
        gy.innerHTML = response[i];
        graduationYear.appendChild(gy);
    }
}

let signupForm = document.getElementById("signupForm")
const alert = document.querySelector(".alert-danger")
alert.style.display = "none";
async function postData(event) {
    event.preventDefault()
    let signupData = {
        firstname: document.getElementsByName("firstName")[0].value,
        lastname: document.getElementsByName("lastName")[0].value,
        email: document.getElementsByName("email")[0].value,
        password: document.getElementsByName("password")[0].value,
        matricNumber: document.getElementsByName("matricNumber")[0].value,
        program: document.getElementsByName("program")[0].value,
        graduationYear: document.getElementsByName("graduationYear")[0].value,
    }
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    const data = await response.json();
    console.log(response)

    if (response.status === 200) {
        document.cookie;
    }
    else if (response.status != 200) {
     // alert.innerHTML = <p>A user with <strong>${error}</strong></p>;
    }
}

signupForm.addEventListener('submit', postData);