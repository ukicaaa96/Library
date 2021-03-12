<?php


function add_transaction($userId,$book,$transaction,$conn){
	$date = date("d.m.Y h:i:sa");
			$sql = 'INSERT INTO istorija (user_id, knjiga, datum ,transakcija) VALUES ("'.$userId.'","'.$book.'","'.$date.'","'.$transaction.'");';
			
					if (mysqli_query($conn, $sql)) {
			  			return true;
					} else {
						return false;	
						}

}






















?>