<?php
    
    class ModelUser extends baseQuery{

        public $id_user;
        public $userName_user;
        public $name_user;
        public $age_user;
        public $photo_user;
        public $photo_userOld;
        public $password_user;
        public $email_user;

        public function GetUser(){

            $consult = $this->cosultOutput("select * from userreact ",[]);
            return $consult;

        }

        public function ValidateUser(){

            $consult = $this->cosultOutput("select userName_user from userreact where userName_user = ?",[$this->userName_user]);
            return $consult;

        }

        public function DeleteUser(){

            unlink("../img/".$this->photo_user);

            $consult = $this->cosultInput("delete from userreact where id_user = ?",[$this->id_user]);

            return $consult;

        }

        public function UpdateUser(){

            $date=new DateTime();
            $nameimage=($this->photo_user['name']!='')?$date->getTimestamp()."_".$this->photo_user['name']:"";


            if($this->password_user == "" and $this->photo_user['name'] == ""){

                $consult = $this->cosultInput("UPDATE `userreact` SET `name_user` = ?, `age_user` = ?, `DateUpdate_user` = ?, `email_user` = ? WHERE `userName_user` = ?;",[$this->name_user , $this->age_user , date('Y-m-d') , $this->email_user, $this->userName_user]);

            }elseif($this->password_user == ""){

                $consult = $this->cosultInput("UPDATE `userreact` SET `name_user` = ?, `age_user` = ?, `photo_user` = ?, `DateUpdate_user` = ? , `email_user` = ? WHERE `userName_user` = ?;",[$this->name_user , $this->age_user , $nameimage , date('Y-m-d') , $this->email_user, $this->userName_user]);

            }elseif($this->photo_user['name'] == ""){

                $consult = $this->cosultInput("UPDATE `userreact` SET `name_user` = ?, `age_user` = ?, `password_user` = ?, `DateUpdate_user` = ? , `email_user` = ? WHERE `userName_user` = ?;",[$this->name_user , $this->age_user , $this->password_user , date('Y-m-d') , $this->email_user, $this->userName_user]);

            }else{

                $consult = $this->cosultInput("UPDATE `userreact` SET `name_user` = ?, `age_user` = ?, `photo_user` = ?, `password_user` = ?, `DateUpdate_user` = ? , `email_user` = ? WHERE `userName_user` = ?;",[$this->name_user , $this->age_user , $nameimage , $this->password_user , date('Y-m-d') , $this->email_user, $this->userName_user]);

            }

            if($consult){
                if($this->photo_user['tmp_name']!=""){
                    unlink("../img/".$this->photo_userOld);
                    move_uploaded_file($this->photo_user['tmp_name'],"../img/".$nameimage);
                }
            }

            return $consult;

        }

        public function InsertUser(){

            $date=new DateTime();
            $nameimage=($this->photo_user['name']!='')?$date->getTimestamp()."_".$this->photo_user['name']:null;


            $consult = $this->cosultInput("INSERT INTO `userreact` ( `userName_user`, `name_user`, `age_user`, `photo_user`, `password_user`, `DateCreate_user`, `email_user`) VALUES (?, ?, ?, ?, ?, ?, ?);",[$this->userName_user, $this->name_user , $this->age_user , $nameimage , $this->password_user, date('Y-m-d'), $this->email_user]);


            if($this->photo_user['tmp_name']!=""){
                move_uploaded_file($this->photo_user['tmp_name'],"../img/".$nameimage);
            }

            return $consult;

        }

    }

?>