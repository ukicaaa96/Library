<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php

include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';

function check_book_exist($bookId, $userId, $conn)
{
	$sql = 'SELECT * FROM iznajmljivanje WHERE id_knjige = '.$bookId.' AND id_korisnika = '.$userId.';';
	$result = mysqli_query($conn, $sql);
	$cnt = mysqli_num_rows($result);

	if($cnt == 0){
		return false;
	}
	else{
		return true;
	}
}


function get_book_id($bookName, $conn){
	$sql = 'SELECT * FROM knjige WHERE ime_knjige = "'.$bookName.'";';
    $result = mysqli_query($conn, $sql);
    $cnt = mysqli_num_rows($result);

	if($cnt != 0){

		while ($row = mysqli_fetch_assoc($result)) 
		{
    		$bookId = $row['id_knjige'];
		}

		return array('poruka' => true, 'id' => $bookId );
	}

	else{
		return array('poruka' => false);
	}
	
}




$bookName = $_REQUEST['knjiga'];
$data = get_book_id($bookName, $conn);

if($data['poruka'] == true){

	$bookId = $data['id'];

	if(isset($_REQUEST['id']) && isset($_REQUEST['status'])){
		$status = $_REQUEST['status'];
		$userId = $_REQUEST['id'];

		if($status != 'student'){
			echo generate_return_message("Samo student moze vratiti knjigu");
		}

		else{

			if(check_book_exist($bookId, $userId, $conn) == false){
				generate_return_message("Ova knjiga nije iznajmljivana i ne moze biti vracena");
				
		}

			else{

				$sql = 'DELETE FROM iznajmljivanje WHERE id_knjige = '.$bookId.' AND id_korisnika = '.$userId.';';
				if (mysqli_query($conn, $sql)) {
					echo generate_return_message("Knjiga je vracena");
				} else {
					echo generate_return_message("Greska");
				}
			}
		}
	}
}
else{
	echo generate_return_message("Knjiga ne postoji");
}





?>