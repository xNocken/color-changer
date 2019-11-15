<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reset password</title>
    <link href="/dist/style.css" rel="stylesheet">
</head>
<body>
    <div class="center">
        <form id="reset_password">
            <input type="text" placeholder="Username">
            <input type="submit" value="Submit">
        </form>
    </div>
    <script src="/dist/app.js"></script>

    <script type="text/x-handlebars-template" id="resetform">
        <p>{{ securityQuestion }}</p>
        <input type="text" placeholder="Answer"><br>
        <input autocomplete="on" type="password" placeholder="Password"><br>
        <input autocomplete="on" type="password" placeholder="Repeat Password"><br>
        <input type="submit" value="submit">
        <input type="hidden" value="change">
    </script>

</body>
</html>
