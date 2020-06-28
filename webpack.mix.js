const mix = require("laravel-mix");

mix.react("resources/js/main.js", "public/js").sass(
    "resources/sass/app.scss",
    "public/css"
);
