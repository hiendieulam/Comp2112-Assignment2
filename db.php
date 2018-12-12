<?php
// Connect database
 $server ='mysql:host=aws.computerstudi.es;dbname=gcc200381290';
 $user='gcc200381290';
 $pass='xdISxEUT9u';

 // Perform a connection to the database
 try{
	 $conn = new PDO($server, $user, $pass);
	 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 }catch(PDOException $error){
	 echo 'There was a prolem connecting to db';
	 echo $error->getMessage();
 }
?>
