function getPrograms() {
    let programs = document.getElementById("programs")
    fetch('/api/programs', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                let pg = document.createElement("option")
                pg.innerHTML = response[i];
                programs.appendChild(pg);
            }
        })
        .catch(error => {
            console.log('ERROR:', error)
        })

}
function getGraduationYears() {
    let graduationYear = document.getElementById("graduationYears")
    fetch('/api/graduationYears', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                let gy = document.createElement("option")
                gy.innerHTML = response[i];
                graduationYear.appendChild(gy);
            }
        })
        .catch(error => {
            console.log('ERROR:', error)
        })

}
let signupForm = document.getElementById("signupForm")
const alert = document.querySelector(".alert-danger")
alert.style.display = "none";
function postData(event) {
    event.preventDefault()
    let signupData = {
        firstname: document.getElementsByName("firstName")[0].value,
        lastname: document.getElementsByName("lastName")[0].value,
        email: document.getElementsByName("email")[0].value,
        password: document.getElementsByName("password")[0].value,
        matricNumber: document.getElementsByName("matricNumber")[0].value,
        program: document.getElementsByName("program")[0].value,
        graduationYear: document.getElementsByName("graduationYear")[0].value
    }

  //  console.log(signupData)
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
        .then((response) => {
           // console.log(response)
            response.json()
            console.log(response)
        })
        .then(response => {
           if (response.status == "ok") {
                document.cookie = `uid = ${response.data.id}; path=/`;
                window.location.replace('index.html')
            }
            else if (response.status != "ok") {
                alert.style.display = "block"
                let errs = response.error.toString().replaceAll(",", "<br>")
                alert.innerHTML = errs;
            }
              console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}
signupForm.addEventListener('submit', postData)