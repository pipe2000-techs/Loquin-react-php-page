<?php 

	require '../Model/baseQuery.php';
	require '../Model/ModelChangePassword.php';

    $ChangePassword = new ModelChangePassword();

	$ChangePassword->userName_user = $_GET['userName_user'];
	$ChangePassword->password_user = ($_POST['password_user'] == "") ? "" : openssl_encrypt($_POST['password_user'],cod,key);
	$ChangePassword->code= openssl_encrypt($_GET['code'] ,cod,key);
	$ChangePassword->codeBack= $_GET['codeBack'];

	if ($_GET['service'] == 'validateUser') {

		$ValUser = $ChangePassword->ValidateUser();

		if($ValUser){

			$code = $ChangePassword->getCode();

			echo '{ "msg" : 1 , "code" : "'.openssl_encrypt($code ,cod,key).'"}';


            require '../librerias/phpmailer/PHPMailer.php';
			require '../librerias/phpmailer/SMTP.php';
			require '../librerias/phpmailer/Exception.php';
			require '../librerias/phpmailer/OAuth.php';
			$mail = new PHPMailer\PHPMailer\PHPMailer();
			$mail->isSMTP();
			$mail->SMTPDebug = 0;//0
			$mail->Host = 'smtp.gmail.com';
			$mail->Port = 587;
			$mail->SMTPSecure = 'tls'; 
			$mail->SMTPAuth = true;
			$mail->Username = "los000pinos@gmail.com";
			$mail->Password = "jtsjvsyghzrswbsz";
			$mail->CharSet = 'UTF-8';
            $mail->setFrom('los000pinos@gmail.com', 'Codigo - Autenticacion');
            $mail->addAddress($ValUser[0]['email_user']);//
            $mail->Subject = 'Codigo - Cambiar contraseña';//
            $mail->Body = "Hola Como Estas? <br><br> El Codigo es: <h1><b>".$code."</b></h1>  Muchas Gracias!";//
            $mail->IsHTML(true);//
			$mail->send();

		}else{

			echo '{ "msg" : 0}';

		}

	}

	if ($_GET['service'] == 'validateCode') {

		$ValCode = $ChangePassword->validateCode();

		if ($ValCode) {
			echo '{ "msg" : 1}';
		}else{
			echo '{ "msg" : 0}';
		} 

	}

	if ($_GET['service'] == 'newPassword') {

		$ChangePassword->userName_user = $_POST['userName_user'];

		$nPassword = $ChangePassword->newPassword();

		if ($nPassword) {
			echo '{ "msg" : 1}';
		}else{
			echo '{ "msg" : 0}';
		} 

	}


?>