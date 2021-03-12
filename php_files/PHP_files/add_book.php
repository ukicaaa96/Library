<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php

include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';
include_once './functions/get_status.php';


function check_book_exist($bookName, $conn)
{
	$sql = 'SELECT * FROM knjige WHERE ime_knjige = "'. $bookName. '";';
	$result = mysqli_query($conn, $sql);
	$cnt = mysqli_num_rows($result);
	if($cnt == 0){
		return false;
	}
	else{
		return true;
	}
}

function run_query($bookName, $authorName, $conn)
{
	if(check_book_exist($bookName, $conn) == false){
		$sql = 'INSERT INTO knjige (ime_knjige, autor_knjige) VALUES ("'.$bookName.'", "'.$authorName.'");';
		if (mysqli_query($conn, $sql)) {
			generate_return_message("Knjiga je uspesno dodata");

		} else {
			generate_return_message("Greska");
		}
	}
	else{
		generate_return_message("Knjiga vec postoji");
	}
}


$bookName = $_REQUEST['knjiga'];
$authorName = $_REQUEST['autor'];


if($_REQUEST['status'] != 'null')
{
	$status = $_REQUEST['status'];
	if($status != 'admin'){
		generate_return_message("Samo admin moze dodavati knjige u bazu");
	} else{
		run_query($bookName, $authorName , $conn);
	}
}
else{
	generate_return_message("Niste ulogovani");
	}

































?>