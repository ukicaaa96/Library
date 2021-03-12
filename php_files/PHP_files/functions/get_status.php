<?php

function get_status($mail, $conn){

	$sql = 'SELECT status FROM korisnici WHERE mail = "'. $mail. '";';
	$result = mysqli_query($conn, $sql);
	$cnt = mysqli_num_rows($result);
	while ($row = mysqli_fetch_assoc($result)) 
	{
	$status = $row['status'];
	}

	if($cnt == 0){
		return "null";
	}
	else{
		return $status;
	}
}

















?>