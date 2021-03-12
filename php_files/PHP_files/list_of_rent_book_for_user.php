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

function get_user_id($ime, $conn){

	$sql = "SELECT * FROM korisnici WHERE ime = '".$ime."';";
    $result = mysqli_query($conn, $sql);
    $cnt = mysqli_num_rows($result);

	if($cnt != 0){

		while ($row = mysqli_fetch_assoc($result)) 
		{
    		$userId = $row['id_korisnika'];
		}

		return array('poruka' => true, 'id' => $userId );
	}

	else{
		return array('poruka' => false);
	}
}





$ime = $_REQUEST['ime'];
$status = $_REQUEST['status'];
$data = get_user_id($ime,$conn);


if($data['poruka'] == true){

	$userId = $data['id'];

	if(isset($_REQUEST['status'])){
		if($_REQUEST['status'] != 'student'){
			$sql = 'SELECT knjige.ime_knjige FROM knjige INNER JOIN iznajmljivanje ON knjige.id_knjige = iznajmljivanje.id_knjige and iznajmljivanje.id_korisnika= '.$userId.';';

			if($result = $conn -> query($sql)){

				$cnt = mysqli_num_rows($result);
				$bookArray = [];

				while ($row = mysqli_fetch_assoc($result)) 
				{
	    			array_push($bookArray, ['knjiga' =>$row['ime_knjige']]);
				}
		
				if($cnt == 0){
					echo generate_return_message("Ovaj korisnik nema iznajmljenih knjiga");
				}
				else{
					get_books($bookArray);

				}
			
			}
		}
		else{
			echo generate_return_message("Student ne moze imati uvid u iznajmljene knjige");
		}
	}
}
else{
	echo generate_return_message("Korisnik ne postoji");
}



































?>