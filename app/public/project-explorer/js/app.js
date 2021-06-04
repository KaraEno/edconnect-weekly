const path = window.location.href
if (path.includes("register.html")) {
    window.onload = function () {
        //Fetching programs
        let programs = document.getElementById("programs")
        fetch('/api/programs', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.json()
                console
            })
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


        //Fetching graduationYears
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
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response.status == "ok") {
                    document.cookie = `uid = ${response.data.id}; expires=Wed, 30 June 2021 12:00:00 UTC"; path=/`;

                    window.location.href = "index.html"
                }
                else if (response.status != "ok") {
                    alert.style.display = "block"
                    let errs = response.errors.toString().replaceAll(",", "<br>")
                    alert.innerHTML = errs;
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    signupForm.addEventListener('submit', postData)
}

// Setting up the navbar
if (document.cookie) {
    function getCookie(cookiename) {
        var name = cookiename + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var splitDecodedCookie = decodedCookie.split(';');
        for (var i = 0; i < splitDecodedCookie.length; i++) {
            var cook = splitDecodedCookie[i];
            while (cook.charAt(0) == ' ') {
                cook = cook.substring(1);
            }
            if (cook.indexOf(name) == 0) {
                return cook.substring(name.length, cook.length);
            }
        }
        return null;
    }

    let lookupCookie = getCookie("uid")
    console.log(lookupCookie)
    let getusername = document.getElementById("username")
    let getLogout = document.getElementById("logout")
    let getSignup = document.getElementById("signup")
    let getLogin = document.getElementById("login")
    let verifyCookie = lookupCookie ? true : false;
    if (verifyCookie === true) {
        fetch(`/api/users/${lookupCookie}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getLogin.style.display = "none"
                getSignup.style.display = "none"
                getLogout.style.display = "block"
                getusername.innerHTML = ` Hi, ${data.firstname}`
                getusername.style.display = "block"
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Log out user and removes cookie
    let exitlogin = document.getElementById("logout")
    function logout(event) {
        event.preventDefault()
        document.cookie = `uid =;  expires=Sun, 30 May 1981 12:00:00 UTC"; path=/`;
        window.location.href = "index.html";
        let getNavLinkss = document.querySelectorAll(".hide")
        for (let i = 0; i < getNavLinkss.length; i++) {
            getNavLinkss[i].style.display = "block"
        }
    }
    exitlogin.addEventListener("click", logout)
}

// Login page
let loginForm = document.getElementById("loginForm")
const loginAlert = document.querySelector(".alert-danger")
loginAlert.style.display = "none";
if (path.includes("login.html")) {
    window.onload = function () {
        let loginData = {
            email: document.getElementsByName("email")[0],
            password: document.getElementsByName("password")[0]
        }
        function sendPost(event) {
            event.preventDefault()
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status === "ok") {
                        document.cookie = `uid = ${result.data.id}; expires=Wed, 30 June 2021 12:00:00 UTC"; path=/`;

                        window.location.href = "index.html"
                    }
                    else if (result.status !== "ok") {
                        loginAlert.innerHTML = result.errors;
                        loginAlert.style.display = "block"
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        loginForm.addEventListener("submit", sendPost)
    }

}