<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php

include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';

function check_user_exist($mail, $name, $conn)
{
	$sql = 'SELECT * FROM korisnici WHERE mail = "'.$mail.'" AND ime = "'.$name.'";';
	$result = mysqli_query($conn, $sql);
	$cnt = mysqli_num_rows($result);


	if($cnt != 0)
	{
		return true;
	}
	else{
		return false;
	}
}

$name = $_REQUEST['ime'];
$mail = $_REQUEST['mail'];
$password = $_REQUEST['lozinka'];
$status = $_REQUEST['status'];


if(check_user_exist($mail, $name, $conn) == false){

	$sql = 'INSERT INTO korisnici(ime, mail, lozinka, status) VALUES ("'. $name.'","'.$mail.'","'.$password.'","'.$status.'");';

	if (mysqli_query($conn, $sql)) {
		generate_return_message("Uspesna registracija");
	} else {
		generate_return_message("Greska");
	}

}
else{
	generate_return_message("Korisnik vec postoji");

}












































?>