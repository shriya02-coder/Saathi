<?php  

$servername ="localhost";
$username = "root";
$password = "";
$dbname = "form";

$conn = new mysqli($servername, $username, $password, $dbname);



$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["password"];
$salt = "form";
$password_encrypted = sha1($password.$salt);


$sql = "INSERT INTO signup (name, email, password) 
VALUES ('$name', '$email', '$password_encrypted')";

if($conn->query($sql) === TRUE){
	?>
	<script>
		alert('Values have been inserted');
	</script>
	<?php
}
else{
	?>
	<script>
		alert('Values did not insert');
	</script>
	<?php
}


?>