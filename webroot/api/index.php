<?php

/**
 * This is a template php file for your countries search.
 * Use as you will, or start over. It's up to you.
 */
//  header('Content-Type: application/json');
//  echo json_encode(['data' => ['Your data']]);

//  $get_data = callAPI('GET', 'https://restcountries.eu/rest/v2/name/japan', false);
//  $response = json_decode($get_data, true);
//  $errors = $response['response']['errors'];
//  $data = $response['response']['data'][0];

//  echo($data);

//  function callAPI($method, $url, $data){
//     $curl = curl_init();
//     switch ($method){
//        case "POST":
//           curl_setopt($curl, CURLOPT_POST, 1);
//           if ($data)
//              curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
//           break;
//        case "PUT":
//           curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
//           if ($data)
//              curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
//           break;
//        default:
//           if ($data)
//              $url = sprintf("%s?%s", $url, http_build_query($data));
//     }
//     // OPTIONS:
//     curl_setopt($curl, CURLOPT_URL, $url);
//     curl_setopt($curl, CURLOPT_HTTPHEADER, array(
//        'APIKEY: 111111111111111111111',
//        'Content-Type: application/json',
//     ));
//     curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//     curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//     // EXECUTE:
//     $result = curl_exec($curl);
//     if(!$result){die("Connection Failure");}
//     curl_close($curl);
//     return $result;
//  }

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

        default:
            echo "Somehow a search type was not selected.";
    }
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    if ($curl_response === false) {
        $info = curl_getinfo($curl);
        curl_close($curl);
        die('error occured during curl exec. Additioanl info: ' . var_export($info));
    }
    curl_close($curl);
    $decoded = json_decode($curl_response);

    // print_r($decoded);

    /*
    if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
        die('error occured: ' . $decoded->response->errormessage);
    }
    // echo 'response ok!'."\n";
    // echo $curl_response."\n";
    // echo gettype($decoded)."\n";
    // echo $decoded[0]->name;

    */

    // function sortByPopulation($a, $b)
    // {
    //     $a = $a['population'];
    //     $b = $b['population'];

    //     if ($a == $b) return 0;
    //     return ($a < $b) ? -1 : 1;
    // }

    //sort decoded array by population
    usort($decoded, function($a, $b) { //Sort the array using a user defined function
        return $a->population > $b->population ? -1 : 1; //Compare the populations
    }); 

    // usort($decoded, sortByPopulation);

    // $results = print_r($decoded, true);

    header('Content-type: application/json');
    echo json_encode($decoded);

?>
