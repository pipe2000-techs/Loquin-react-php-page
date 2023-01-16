<?php
    
    class ModelChangePassword extends baseQuery{

        public $userName_user;
        public $password_user;
        public $code;
        public $codeBack;

        public function ValidateUser(){

            $consult = $this->cosultOutput("select email_user from userreact where userName_user = ?",[$this->userName_user]);
            return $consult;

        }

        public function getCode(){

            $chars = '0123456789';
			return substr(str_shuffle($chars), 0, 5);

        }

        public function validateCode(){

            if($this->codeBack == $this->code){
                return true; 
            }else{
                return false; 
            }

        }

        public function newPassword(){

            $consult = $this->cosultInput("UPDATE `userreact` SET `password_user` = ? WHERE `userName_user` = ?",[$this->password_user, $this->userName_user]);

            return $consult;

        }


    }

?>