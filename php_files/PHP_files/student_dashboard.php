<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php


include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';


$userId = $_REQUEST['id'];





function get_last_five($id,$conn){


	$sql = "SELECT * FROM istorija WHERE user_id =".$id." LIMIT 10";
    $result = mysqli_query($conn, $sql);
    $cnt = mysqli_num_rows($result);
    $books = [];
	if($cnt != 0){

		while ($row = mysqli_fetch_assoc($result)) 
		{
			$dateNow = strtotime(date("d.m.Y h:i:sa"));
			$dateOfRent = strtotime($row['datum']);

			$dateLimit = $dateNow-420000;

			if($dateOfRent<$dateLimit && $row['transakcija'] != 0){
				$color = 'red';
			}
			else{
				$color = 'white';
			}
			
			$dateFormat = explode(" ",$row['datum'])[0];
    		array_push($books, 
    			[
    			'knjiga' =>$row['knjiga'],
    			'datum' =>$dateFormat,
    			'transakcija' =>$row['transakcija'],
    			'rok' => $color
    		]);
		}

		return array('last5' => $books );
	}

	else{
		return array('last5' => false);
	}
}


$array = get_last_five($userId, $conn)['last5'];
$json = json_encode($array);
echo $json;










?>