const init = () => {

    let countryButton = document.querySelector("#getCountryByName");
    countryButton.addEventListener("click", callNameApi);

}

const callNameApi = () => {

    let oldNode = document.getElementById("countryContent");

    document.body.removeChild(oldNode);

    let node = document.createElement("div");
    node.setAttribute("id", "countryContent");
    document.body.appendChild(node);

    let contentDiv = document.getElementById("countryContent");
    let inputCheck = true;

    let name = document.getElementById('search').value;

    if (name.length == 0) {
        let warning = document.createElement("p");
        warning.innerHTML = 'You must enter a value';
        // document.body.appendChild(warning);
        contentDiv.appendChild(warning);
        inputCheck = false;
    }

    if (inputCheck) {
        let xhr = new XMLHttpRequest();
        let url = "api/index.php?name=" + name;

        xhr.open("get", url);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                let response = xhr.responseText;
                let paragraph = document.createElement("p");
                paragraph.innerHTML = response;
                // document.body.appendChild(paragraph);
                contentDiv.appendChild(paragraph);
            }
        }

        xhr.send(null);

    }

}

window.onload = init;