<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
</head>
<body>
    <h2>Login</h2>
    <form id="loginForm">
        <label>Username:</label>
        <input type="text" name="username" id="username" required>
        <br><br>
        <label>Password:</label>
        <input type="password" name="password" id="password" required>
        <br><br>
        <button type="submit">Login</button>
    </form>

    <p id="message"></p> <!-- This will display success or error messages -->

    <script>
        document.getElementById("loginForm").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent form from submitting traditionally

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            document.getElementById("message").innerText = result.message;

            if (result.success) {
                setTimeout(() => {
                    window.location.href = "/index"; // Redirect after 2 seconds
                }, 2000);
            }
        });
        
    </script>
</body>
</html>