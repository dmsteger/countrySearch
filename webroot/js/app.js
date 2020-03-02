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

    let search = document.getElementById("search").value;
    let searchType = document.getElementById("searchType").value;
    console.log(searchType);

    if (search.length == 0) {
        let warning = document.createElement("p");
        warning.innerHTML = 'You must enter a value';
        // document.body.appendChild(warning);
        contentDiv.appendChild(warning);
        inputCheck = false;
    }

    if (inputCheck) {
        let xhr = new XMLHttpRequest();
        let url = "api/index.php?search=" + search + "&searchType=" + searchType;

        xhr.open("get", url);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                let response = JSON.parse(xhr.responseText);


    //full name, alpha code 2, alpha code 3, flag image, region, subregion, population, and a list
    // of its languages
                for (let country of response) {
                    console.log(country.name);
                    console.log(country.name);
                    console.log(country.name);
                    console.log(country.name);
                    console.log(country.name);
                    console.log(country.name);
                    console.log(country.name);
                    console.log(country.name);
                }

                let paragraph = document.createElement("p");
                paragraph.innerHTML = response;
                // document.body.appendChild(paragraph);

                console.log(response);
                contentDiv.appendChild(paragraph);
            }
        }

        xhr.send(null);

    }

}

window.onload = init;