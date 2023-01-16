<?php 

	require '../Model/baseQuery.php';
	require '../Model/ModelLogin.php';

    $login = new logins();

    $login->user = $_POST['user'];
    $login->password= openssl_encrypt($_POST['psw'],cod,key);

	$validateLogin = $login->login();

	if(!$validateLogin){

		echo '{ "msg" : "Usuario o contraseña Incorrectos"}';

	}else{

		echo json_encode($validateLogin[0]);

	}

?>