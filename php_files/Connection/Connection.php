<?php

$host = 'localhost';
$username = 'uros';
$password = '12345678';
$db = 'biblioteka_uros';


// Create connection
$conn = new mysqli($host, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";



?>