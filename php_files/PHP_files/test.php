<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>

<?php

include_once '../Connection/Connection.php';

$sql = 'SELECT status FROM korisnici WHERE mail = "admin@example.com";';
$result = mysqli_query($conn, $sql);
$cnt = mysqli_num_rows($result);
while ($row = mysqli_fetch_assoc($result)) 
{
$status = $row['status'];
}

if($cnt == 0){
	echo "null";
}
else{
	echo $status;
}

