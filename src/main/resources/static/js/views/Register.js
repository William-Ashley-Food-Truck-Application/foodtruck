import CreateView from "../createView.js"

export default function Register(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Register</title>
            </head>
            <body>  
                <div class="card w-50 m-auto register-card">
                    <div class="card-header background-card-dark">
                        <h2>Register</h2>
                    </div>
                    <div class="card-body background-card-dark">
                        <form id="register-form">                    
                            <div class="mb-3">
                                <label for="email" class="form-label">Email <span id="email-warning"></span></label>
                                <input type="email" class="form-control background-card-dark settingForm" id="email" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="number" class="form-label">Phone Number <span id="phoneNumberWarning" class="warning mx-2"></span></label>
                                <input type="tel" name="number" id="phoneNumber" class="form-control background-card-dark settingForm" maxlength="12">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password <span id="password-warning"></span></label>
                                <input type="password" class="form-control background-card-dark settingForm" id="password">
                            </div>
                            <button type="button" class="btn btn-primary" id="register-btn">Register</button>
                        </form>
                    </div>
                </div>      
            </body>
        </html>
`;
}

export function RegisterEvent(){
    phoneNumberEventListener();
    $("#register-btn").click(function(){
        clearWarnings();

        const email = $("#email").val();
        const password = $("#password").val();
        let phoneNumber = $('#phoneNumber').val();

        phoneNumber = formatPhoneNumber(phoneNumber);

        if (phoneNumber.length !== 10) {
            let phWarning = $("#phoneNumberWarning");
            phWarning.text("* Phone number incorrect")
            return;
        }

        let newUser = {
            email,
            phoneNumber,
            password
        }

        console.log(newUser);

        let request = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        }

        fetch("http://localhost:8080/api/users/create", request)
            .then(response => {
                console.log(response.status);
                CreateView("/");
            })

    })
}

function clearWarnings() {
    let phWarning = $("#phoneNumberWarning");
    let eWarning = $("#email-warning");
    let pWarning = $("#password-warning");

    phWarning.text("");
    eWarning.text("");
    pWarning.text("");

}

function phoneNumberEventListener() {
    $("#phoneNumber").keyup(function (e){
        if (e.keyCode === 8) {
            return;
        }
        if (e.keyCode < 48 || e.keyCode > 57 && e.keyCode !== 189) {
            this.value = this.value.slice(0, -1)
        }
        //
        // if (this.value.length === 3 || this.value.length === 7) {
        //     this.value += "-";
        // }
    })
}

function formatPhoneNumber(phonenumber) {
    if (!phonenumber.includes("-")) {
        return phonenumber;
    }
    return phonenumber.replace(/-/g, '');
}