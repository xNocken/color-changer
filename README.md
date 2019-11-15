# Color Changer

## Requirements

* PHP
* MySQL
* Apache
* Yarn

To get started, clone the project from [GitHub](https://github.com/xNocken/color-changer) and follow the steps below:

* Open any shell in root and type ```yarn i```
* Navigate to /src/php/
* Clone the db.php.example file and rename it to db.php
* Use the information inside the db.php file to set up your database connection
* Using phpMyAdmin or any other database manager, import the **colors.sql** file inside the /db/ folder

## Development

* Run webpack with ```yarn run dev```

To run the project, use MAMP (or XAMPP or any other local web development solution). If you're on a unix based system, you can also run the following command to start a virtual PHP server on your local machine: `php -S localhost:8000` in the root of the project.

By default, you will see the login/registration form if you're not registered or logged in.
