<?php
    error_reporting(0);

    //con est fragmento solucuionamos el problema con los cors 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    ///////////////////////////////////////////////////////////////////////////


    //clave y metodo de encriptacion
    define("key","react5256_");
    define("cod","aes-128-ecb");

    //datos para conectarnos a la base de datos
    define("servidor", "localhost");
	define("usuario", "root");
	define("contraseña", "");
	define("bd", "user_react");

    //zona horaria
    date_default_timezone_set("America/Bogota");

    class baseQuery {
        //conexion a la base de datos con PDO
        private function conx(){

            $servidor="mysql:dbname=".bd.";host=".servidor;
            try{
                
                $pdo= new PDO($servidor,usuario,contraseña, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"set names utf8"));
                
            }catch(PDOException $e){
                
                echo '{ "msg" : "Could not connect to the database"}';

            }
            
            return $pdo;

        }

        public function cosultInput($consult, $data){

            $consult = $this->conx() -> prepare($consult);
            $consult -> execute($data);
            return $consult;

        }

        public function cosultOutput($consult, $data){

            $consult = $this->conx() -> prepare($consult);
            $consult -> execute($data);
            $consult = $consult -> fetchall(PDO::FETCH_ASSOC);
            return $consult;

        }
    }

    
?>