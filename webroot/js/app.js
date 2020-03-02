const init = () => {

    let countryButton = document.querySelector("#getCountryByName");
    countryButton.addEventListener("click", callApi);

}

const callApi = () => {

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

    if (search.length == 0) {
        let warning = document.createElement("h2");
        warning.innerHTML = 'Please Enter a Search Term';
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

                if ((response.status != 404) && (searchType != "code")) {

                        let resultHeader = document.createElement("h2");
                        resultHeader.innerHTML = "Results (in order of population):";
                        contentDiv.appendChild(resultHeader);    

        //full name, alpha code 2, alpha code 3, flag image, region, subregion, population, and a list
        // of its languages
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
                        alpha2Line.innerHTML = "Alpha 2 Code: " + alpha2Code;

                        let alpha3Line = document.createElement("li");
                        alpha3Line.innerHTML = "Alpha 3 Code: " + alpha3Code;

                        let populationLine = document.createElement("li");
                        populationLine.innerHTML = "Population: " + population;

                        let regionLine = document.createElement("li");
                        regionLine.innerHTML = "Region: " + region;

                        let subregionLine = document.createElement("li");
                        subregionLine.innerHTML = "Subregion: " + subregion;

                        let languagesLine = document.createElement("li");
                        languagesLine.innerHTML = "Languages Spoken: ";

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
                    alpha2Line.innerHTML = "Alpha 2 Code: " + alpha2Code;

                    let alpha3Line = document.createElement("li");
                    alpha3Line.innerHTML = "Alpha 3 Code: " + alpha3Code;

                    let populationLine = document.createElement("li");
                    populationLine.innerHTML = "Population: " + population;

                    let regionLine = document.createElement("li");
                    regionLine.innerHTML = "Region: " + region;

                    let subregionLine = document.createElement("li");
                    subregionLine.innerHTML = "Subregion: " + subregion;

                    let languagesLine = document.createElement("li");
                    languagesLine.innerHTML = "Languages Spoken: ";

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
                    let warning = document.createElement("h2");
                    warning.innerHTML = 'No results';
                    contentDiv.appendChild(warning);            
                }


                if(countryNames.length > 0) {

                    let resultShift = document.createElement("hr");
                    contentDiv.appendChild(resultShift);

                    let countryArraySize = countryNames.length;
                    let countryTotalHeader = document.createElement("h3");
                    countryTotalHeader.innerHTML = "Total Countries Returned: " + countryArraySize;
                    contentDiv.appendChild(countryTotalHeader);

                    let regionObject = {};

                    for (let i = 0; i < regionNames.length; i++) {
                        regionObject[regionNames[i]] = 1 + (regionObject[regionNames[i]] || 0);
                    }

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