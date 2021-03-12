<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php

include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';

function get_books($bookArray)
{
	
	$json = json_encode($bookArray);
  	echo $json;

}



$id = $_REQUEST['id'];



$sql = 'SELECT knjige.ime_knjige, iznajmljivanje.datum FROM knjige INNER JOIN iznajmljivanje ON knjige.id_knjige = iznajmljivanje.id_knjige and iznajmljivanje.id_korisnika= '.$id.';';

if($result = $conn -> query($sql)){
	$cnt = mysqli_num_rows($result);
	if($cnt == 0){
		echo generate_return_message("Ovaj korisnik nema iznajmljenih knjiga");
	}
	else{
		$bookArray = [];

		while ($row = mysqli_fetch_assoc($result)) 
		{
			$dateFormat = explode(" ",$row['datum'])[0];
			array_push($bookArray,[
				'knjiga' =>$row['ime_knjige'],
			    'datum' =>$dateFormat
			]);
		}
		get_books($bookArray);
	}
}








	




































?>