
<?php
    $searchType = $_GET['searchType'];
    $search = $_GET['search'];

    switch ($searchType) {
        case "name":

            $service_url = 'https://restcountries.eu/rest/v2/name/' . $search;

        break;
        
        case "fullName":

            $service_url = 'https://restcountries.eu/rest/v2/name/' . $search . '?fullText=true';

        break;

        case "code":

            $service_url = 'https://restcountries.eu/rest/v2/alpha/' . $search;

        break;

        case "whatever":

        break;

        default:
            echo "Somehow a search type was not selected.";
    }
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    if ($curl_response === false) {
        $info = curl_getinfo($curl);
        curl_close($curl);
        die('error occured during curl exec. Additional info: ' . var_export($info));
    }
    curl_close($curl);
    $decoded = json_decode($curl_response);

    //sort decoded array by population
    usort($decoded, function($a, $b) { //Sort the array using a user defined function
        return $a->population > $b->population ? -1 : 1; //Compare the populations
    }); 

    header('Content-type: application/json');
    echo json_encode($decoded);

?>
