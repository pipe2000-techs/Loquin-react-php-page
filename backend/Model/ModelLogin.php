<?php
    
    class logins extends baseQuery{

        public $user;
        public $password;

        public function login(){

            $consult = $this->cosultOutput("select id_user, userName_user, name_user, age_user, photo_user from userreact where userName_user = ? and password_user = ?",[$this->user,$this->password]);
            return $consult;

        }

    }

?>