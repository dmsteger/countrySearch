
//creates event for callApi function
const init = () => {

    let countryButton = document.querySelector("#getCountryByName");
    countryButton.addEventListener("click", callApi);

}

//takes user input, calls php via xhr, outputs search
const callApi = () => {

    //removes previous search content via div
    let oldNode = document.getElementById("countryContent");
    document.body.removeChild(oldNode);

    let node = document.createElement("div");
    node.setAttribute("id", "countryContent");
    document.body.appendChild(node);

    var countryNames = [];
    var regionNames = [];
    var subregionNames = [];


    let contentDiv = document.getElementById("countryContent");
    let inputCheck = true;

    let search = document.getElementById("search").value;
    let searchType = document.getElementById("searchType").value;

    //validation for empty search and notice for user
    if (search.length == 0) {
        let warning = document.createElement("h2");
        warning.innerHTML = 'Please Enter a Search Term';
        contentDiv.appendChild(warning);
        inputCheck = false;
    }


    //if input is present make ajax call
    if (inputCheck) {

        let xhr = new XMLHttpRequest();
        //pass search and search type to php via GET
        let url = "api/index.php?search=" + search + "&searchType=" + searchType;

        xhr.open("get", url);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {

        
                let response = JSON.parse(xhr.responseText);                

                //test for 404 if no results, code search returns object so slightly different logic needed
                if ((response.status != 404) && (searchType != "code")) {

                        let resultHeader = document.createElement("h2");
                        resultHeader.innerHTML = "Results (in order of population):";
                        contentDiv.appendChild(resultHeader);    

                    for (let country of response) {
                        
                        let countryName = country.name;
                        let alpha2Code = country.alpha2Code;
                        let alpha3Code = country.alpha3Code;
                        let region = country.region;
                        let subregion = country.subregion;
                        let populationUnformatted = country.population;
                        let flagUrl = country.flag;
                        let population = numberWithCommas(populationUnformatted);

                        countryNames.push(countryName);
                        regionNames.push(region);
                        subregionNames.push(subregion);

                        let countryDiv = document.createElement("div");
                        countryDiv.setAttribute("id", alpha3Code);
                        contentDiv.appendChild(countryDiv);

                        let countryHeading = document.createElement("h3");
                        countryHeading.setAttribute("class", "countryHeading");
                        countryHeading.innerHTML = countryName;

                        let flagImage = document.createElement("img");
                        flagImage.setAttribute("src", flagUrl);
                        flagImage.setAttribute("alt", "Flag of " + countryName);
                        flagImage.setAttribute("height", 100);
                        flagImage.setAttribute("width", 150);

                        let countryInformation = document.createElement("ul");
                        countryInformation.setAttribute("id", alpha2Code);

                        let alpha2Line = document.createElement("li");
                        alpha2Line.innerHTML = "<b>Alpha 2 Code:</b> " + alpha2Code;

                        let alpha3Line = document.createElement("li");
                        alpha3Line.innerHTML = "<b>Alpha 3 Code:</b> " + alpha3Code;

                        let populationLine = document.createElement("li");
                        populationLine.innerHTML = "<b>Population:</b> " + population;

                        let regionLine = document.createElement("li");
                        regionLine.innerHTML = "<b>Region:</b> " + region;

                        let subregionLine = document.createElement("li");
                        subregionLine.innerHTML = "<b>Subregion:</b> " + subregion;

                        let languagesLine = document.createElement("li");
                        languagesLine.innerHTML = "<b>Languages Spoken:</b>";

                        let languageList = document.createElement("ul");
                        languageList.setAttribute("id", alpha2Code + "LanguageList");
                        languageList.setAttribute("class", "languageList");

                        countryInformation.appendChild(populationLine);
                        countryInformation.appendChild(alpha2Line);
                        countryInformation.appendChild(alpha3Line);
                        countryInformation.appendChild(regionLine);
                        countryInformation.appendChild(subregionLine);
                        countryInformation.appendChild(languagesLine);
                        countryInformation.appendChild(languageList);

                        for (let language of country.languages) {
                            let languageItem = document.createElement("li");
                            languageItem.innerHTML = language.name;
                            languageList.appendChild(languageItem);
                        }
                        
                        countryDiv.appendChild(countryHeading);
                        countryDiv.appendChild(countryInformation);

                        let flagHeader = document.createElement("h4");
                        flagHeader.innerHTML = "Flag of " + countryName + ":";

                        countryDiv.appendChild(flagHeader);

                        countryDiv.appendChild(flagImage);

                    }

                } else if (response.status != 404 && searchType == "code") {

                    let countryName = response.name;
                    let alpha2Code = response.alpha2Code;
                    let alpha3Code = response.alpha3Code;
                    let region = response.region;
                    let subregion = response.subregion;
                    let populationUnformatted = response.population;
                    let flagUrl = response.flag;
                    let population = numberWithCommas(populationUnformatted);


                    countryNames.push(countryName);
                    regionNames.push(region);
                    subregionNames.push(subregion);

                    let countryDiv = document.createElement("div");
                    countryDiv.setAttribute("id", alpha3Code);
                    contentDiv.appendChild(countryDiv);

                    let countryHeading = document.createElement("h3");
                    countryHeading.setAttribute("class", "countryHeading");
                    countryHeading.innerHTML = countryName;

                    let flagImage = document.createElement("img");
                    flagImage.setAttribute("src", flagUrl);
                    flagImage.setAttribute("alt", "Flag of " + countryName);
                    flagImage.setAttribute("height", 100);
                    flagImage.setAttribute("width", 150);

                    let countryInformation = document.createElement("ul");
                    countryInformation.setAttribute("id", alpha2Code);

                    let alpha2Line = document.createElement("li");
                    alpha2Line.innerHTML = "<b>Alpha 2 Code:</b> " + alpha2Code;

                    let alpha3Line = document.createElement("li");
                    alpha3Line.innerHTML = "<b>Alpha 3 Code:</b> " + alpha3Code;

                    let populationLine = document.createElement("li");
                    populationLine.innerHTML = "<b>Population:</b> " + population;

                    let regionLine = document.createElement("li");
                    regionLine.innerHTML = "<b>Region:</b> " + region;

                    let subregionLine = document.createElement("li");
                    subregionLine.innerHTML = "<b>Subregion:</b> " + subregion;

                    let languagesLine = document.createElement("li");
                    languagesLine.innerHTML = "<b>Languages Spoken:</b> ";

                    let languageList = document.createElement("ul");
                    languageList.setAttribute("id", alpha2Code + "LanguageList");
                    languageList.setAttribute("class", "languageList");

                    countryInformation.appendChild(populationLine);
                    countryInformation.appendChild(alpha2Line);
                    countryInformation.appendChild(alpha3Line);
                    countryInformation.appendChild(regionLine);
                    countryInformation.appendChild(subregionLine);
                    countryInformation.appendChild(languagesLine);
                    countryInformation.appendChild(languageList);

                    for (let language of response.languages) {
                        let languageItem = document.createElement("li");
                        languageItem.innerHTML = language.name;
                        languageList.appendChild(languageItem);
                    }

                    countryDiv.appendChild(countryHeading);
                    countryDiv.appendChild(countryInformation);

                    let flagHeader = document.createElement("h4");
                    flagHeader.innerHTML = "Flag of " + countryName + ":";

                    countryDiv.appendChild(flagHeader);

                    countryDiv.appendChild(flagImage);

                } else {
                    //status is 404 so give no results warning to user
                    let warning = document.createElement("h2");
                    warning.innerHTML = 'No results';
                    contentDiv.appendChild(warning);            
                }

                //if country name array has values output bottom of page results
                if(countryNames.length > 0) {

                    let resultShift = document.createElement("hr");
                    contentDiv.appendChild(resultShift);

                    let countryArraySize = countryNames.length;
                    let countryTotalHeader = document.createElement("h3");
                    countryTotalHeader.innerHTML = "Total Countries Returned: " + countryArraySize;
                    contentDiv.appendChild(countryTotalHeader);

                    //create object for associative arrays
                    let regionObject = {};

                    //loop through region array to create associative array with region counts
                    for (let i = 0; i < regionNames.length; i++) {
                        regionObject[regionNames[i]] = 1 + (regionObject[regionNames[i]] || 0);
                    }

                    //same logic for subregion
                    let subregionObject = {};
                    
                    for (let i = 0; i < subregionNames.length; i++) {
                        subregionObject[subregionNames[i]] = 1 + (subregionObject[subregionNames[i]] || 0);
                    }

                    let regionsHeader = document.createElement("h3");
                    regionsHeader.innerHTML = "Regions:";
                    contentDiv.appendChild(regionsHeader);

                    let regionsList = document.createElement("ul");
                    contentDiv.appendChild(regionsList);

                    for (let region in regionObject) {
                        let regionName = document.createElement("li")
                        regionName.innerHTML = `The count of ${region} in your search is ${regionObject[region]}`;
                        regionsList.appendChild(regionName);
                    }

                    let subregionsHeader = document.createElement("h3");
                    subregionsHeader.innerHTML = "Subregions:";
                    contentDiv.appendChild(subregionsHeader);
                    
                    let subregionsList = document.createElement("ul");
                    contentDiv.appendChild(subregionsList);

                    for (let subregion in subregionObject) {
                        let subregionName = document.createElement("li")
                        subregionName.innerHTML = `The count of ${subregion} in your search is ${subregionObject[subregion]}`;
                        subregionsList.appendChild(subregionName);
                    }

                }        

            }
        }

        xhr.send(null);    

    
    

    }

    const numberWithCommas = (numberToFormat) => {
        return numberToFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

window.onload = init;