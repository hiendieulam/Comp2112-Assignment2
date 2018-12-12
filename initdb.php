<?php
 require_once 'db.php'; // Call the procedure to declare the database connection
 // Create a HIEN_VOTE table if it has not create yet 
 $sql='CREATE TABLE IF NOT EXISTS HIEN_VOTE(id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, vote varchar(1) not null)';
 $cmd = $conn->prepare($sql);
 $cmd->execute();
 $conn=null;
?>