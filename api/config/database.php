<?
define('BASEPATH', realpath(dirname(__FILE__)).'/');
include_once('database/DB.php');


function show_error(){} // supress the error regarding this function
function log_message(){} // supress the error regarding this function

// Use your credentials in this format: driver://username:password@hostname/database

class Database{ 
 
   
    public $db; 
 
    // get the database connection 
    public function getConnection(){ 
    	$this->db = null;
         
        try{
            $db = DB("mysqli://root:mysql@localhost/angular",true);

        }catch(Exception $exception){
            echo "Connection error: " . $exception->getMessage();
        }
         
        return $this->db;
    }
}
?>