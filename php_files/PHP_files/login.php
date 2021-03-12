<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>

<?php


include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';

$mail = $_REQUEST['mail'];
$password = $_REQUEST['lozinka'];


$sql = 'SELECT * FROM korisnici WHERE mail = "'.$mail.'" AND lozinka = "'.$password.'";';
$result = mysqli_query($conn, $sql);
$cnt = mysqli_num_rows($result);


if($cnt != 0)
{
	$row = mysqli_fetch_assoc($result);
	$id = $row['id_korisnika'];
	$status = $row['status'];
	$name = $row['ime'];

	$arr = [
		'status' => $status,
		'id' => $id,
		'ime' => $name
	];
	
	$json = json_encode($arr);
  	echo $json;
	
}
else{
	generate_return_message("Korisnik sa ovim podacima ne postoji");
}










































?>