<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Accept");
?>
<?php
include_once '../Connection/Connection.php';
include_once './functions/generate_return_message.php';

$sql= 'SELECT * FROM   knjige WHERE  id_knjige NOT IN (SELECT id_knjige FROM iznajmljivanje)';

$result = mysqli_query($conn, $sql);
$cnt = mysqli_num_rows($result);

if($cnt != 0){

	$bookArray = [];

	while ($row = mysqli_fetch_assoc($result)) 
	{
		
		array_push($bookArray,[
			'knjiga' =>$row['ime_knjige'],
			   'autor' =>$row['autor_knjige']
		]);
	}
	$json = json_encode($bookArray);
  	echo $json;
}

else{
	generate_return_message("Sve knjige su zauzete");
}
	
?>
