<?php
 header('Access-Control-Allow-Origin: *');
 require_once 'db.php'; 
 $sql="select 'a' voted,count(*) tally from HIEN_VOTE where vote='a'
	   union 
	   select 'b' voted,count(*) tally from HIEN_VOTE where vote='b'
	   union 
	   select 'c' voted,count(*) tally from HIEN_VOTE where vote='c'
	   union 
	   select 'd' voted,count(*) tally from HIEN_VOTE where vote='d'"; // Take total vote called tally
 $cmd = $conn->prepare($sql);  
 // Execute SQL statement
 $cmd->execute(); 
 
 // Push the record data to an object
 $votes=$cmd->fetchAll();  
 $conn=null; // Disconnect Database
 
 // Perform convert record to JSON
 $json=json_encode($votes);
 
 // Output to the screen
 echo $json;

?>