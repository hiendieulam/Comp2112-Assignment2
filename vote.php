<?php
 require_once 'db.php';
 
 //Get data from client submit on server
 $vote = $_POST['vote'];
 
 echo $vote;
 
 $sql='insert into HIEN_VOTE(vote) values(:vote)'; // Add 1 line vote into HIEN_VOTE table
 $cmd = $conn->prepare($sql);
 $cmd->bindParam(':vote', $vote, PDO::PARAM_STR); //Get value to :vote variable
 
 // Execute SQL statement 
 $cmd->execute(); 
 $conn=null; //disconnect Database

?>