<?php

function generate_return_message($message){

  	$arr = ['poruka' => $message];
	$json = json_encode($arr);
  	echo $json;
  }
?>