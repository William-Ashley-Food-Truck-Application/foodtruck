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
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control background-card-dark" id="email" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control background-card-dark" id="password">
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
    $("#register-btn").click(function(){

        const email = $("#email").val();
        const password = $("#password").val()

        let newUser = {
            email,
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