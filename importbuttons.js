document.addEventListener("DOMContentLoaded", function() {
    fetch("importbuttons.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("importbuttons").innerHTML = data;
        });
});