export default function Login(props) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
</head>
<body>
<!--<h1>Log In</h1>-->


                    <div class="card w-50 m-auto login-card">
                        <div class="card-header background-card-dark">
                            <h2>Log in</h2>
                        </div>
                      <div class="card-body background-card-dark">
                        <form id="login-form">
                      <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control background-card-dark" id="username" aria-describedby="emailHelp">
                      </div>
                        
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control background-card-dark" id="password">
                      </div>
                      <button type="submit" class="btn btn-primary" id="login-btn" value="Log in">Login</button>
                        </form>
                      </div>
                    </div>


<!--<form id="login-form">-->
<!--    <label for="username">Username</label>-->
<!--    <input id="username" name="username" type="text"/>-->
<!--    <label for="password">Password</label>-->
<!--    <input id="password" name="password" type="password"/>-->
<!--    <input id="login-btn" type="submit" value="Log In"/>-->
<!--</form>-->
</body>
</html>`;

}


