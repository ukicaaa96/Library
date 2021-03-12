<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php


include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';
include_once './functions/add_transaction.php';

function check_book_status($bookId, $conn)
{
	$sql = 'SELECT * FROM iznajmljivanje WHERE id_knjige = '.$bookId.';';
	$result = mysqli_query($conn, $sql);
	$cnt = mysqli_num_rows($result);

	if($cnt == 0){
		return true;
	}
	else{
		return false;
	}
}

function get_book_data($bookName, $conn){
	$sql = 'SELECT * FROM knjige WHERE ime_knjige = "'.$bookName.'";';
    $result = mysqli_query($conn, $sql);
    $cnt = mysqli_num_rows($result);

	if($cnt != 0){

		while ($row = mysqli_fetch_assoc($result)) 
		{
    		$bookId = $row['id_knjige'];
		}

		return array(
			'poruka' => true,
			'id' => $bookId,
	);
	}

	else{
		return array('poruka' => false);
	}
	
}



$bookName = $_REQUEST['knjiga'];
$data = get_book_data($bookName, $conn);


if($data['poruka'] == true){
	$bookId = $data['id'];
	if(isset($_REQUEST['id']) && isset($_REQUEST['status'])){

		$userId = $_REQUEST['id'];
		$status = $_REQUEST['status'];

		

			if($status == 'student'){
				if(check_book_status($bookId, $conn) == true){
					$date = date("d.m.Y h:i:sa");
					$sql = 'INSERT INTO iznajmljivanje(id_knjige, id_korisnika, datum) VALUES ('.$bookId. ','. $userId.',"'.$date.'");';
					if (mysqli_query($conn, $sql)) {
						$bool = add_transaction($userId, $bookName, 1,$conn); 
						if($bool == true){
							echo generate_return_message("Knjiga je iznajmljena");
						}
						else{
							echo generate_return_message("Greska pri dodavanju transakcije");
						}
			  			
					} else {
						echo generate_return_message("Greska");		
						}
				}
				else{
					echo generate_return_message("Knjiga je vec iznajmljena");	
				}
			}
			else{
				echo generate_return_message("Samo student moze iznajmiti knjigu");	
			}
		}

	
	else{
		echo generate_return_message("Niste ulogovani");	
	}

}
else{
	echo generate_return_message("Knjiga ne postoji");	
}



























?>