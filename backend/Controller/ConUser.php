<?php 

	require '../Model/baseQuery.php';
	require '../Model/ModelUser.php';

    $User = new ModelUser();

	$User->userName_user = $_POST['userName_user'];
	$User->name_user = $_POST['name_user'];
	$User->age_user =$_POST['age_user'];
	$User->photo_user = $_FILES['photo_user'];
	$User->photo_userOld = $_POST['photo_userOld'];
	$User->password_user = ($_POST['password_user'] == "") ? "" : openssl_encrypt($_POST['password_user'],cod,key);
	$User->email_user = $_POST['email_user'];


	if ($_GET['service'] == 'validateUser') {

		$User->userName_user = $_GET['userName_user'];

		$ValUser = $User->ValidateUser();

		if($ValUser){

			echo '{ "msg" : 1}';

		}else{

			echo '{ "msg" : 0}';

		}

	}

	if ($_GET['service'] == 'callUser') {

		$CallUser = $User->GetUser();

		if(!$CallUser){

			echo '{ "msg" : "No Data"}';

		}else{

			echo json_encode($CallUser);

		}

	}

	if ($_GET['service'] == 'DeleteUser') {

		$User->id_user = $_GET['id'];
		$User->photo_user = $_GET['photo_user'];

		$delUser = $User->DeleteUser();

		if ($delUser) {
			echo '{ "msg" : 1}';
		}else{
			echo '{ "msg" : 0}';
		} 

	}

	if ($_GET['service'] == 'UpdateUser') {

		$UpUser = $User->UpdateUser();

		if ($UpUser) {
			echo '{ "msg" : 1}';
		}else{
			echo '{ "msg" : 0}';
		} 

	}

	if ($_GET['service'] == 'InsertUser') {

		$IntUser = $User->InsertUser();

		if ($IntUser) {
			echo '{ "msg" : 1}';
		}else{
			echo '{ "msg" : 0}';
		} 

	}

	

?>