<?php 
function show_error(){} // supress the error regarding this function
function log_message(){} // supress the error regarding this function


class Message{ 
    // database connection and table name 
    private $db; 
    private $table_name = "messages"; 
 
    // object properties 
    public $id; 
    public $text; 
    public $createdAt; 
 
   public function __construct(){
   	$this->db=DB("mysqli://root:mysql@localhost/angular",true);
   }
    private function putHeaders(){
    	header("Access-Control-Allow-Origin: *"); 
    }
    public function add(){
    	$this->putHeaders();
    	$data=$this->getRequest();
    	$this->db->set('createdAt', 'NOW()', FALSE);
    	$result=$this->db->insert($this->table_name,$data);
    	if($result){
    		echo "Message Sent";
    	}else
    	echo "Error Saving Message";
    }
    private function getRequest(){
    	return json_decode(file_get_contents("php://input"));
    }
    public function getList(){
		$query = $this->db->get($this->table_name);
		$this->putHeaders();
		echo json_encode($query->result());
    }
    public function getMore(){
    	$data=$this->getRequest();
    	$query = $this->db->select('*')->from($this->table_name)->where('id >',$data->id)->get();
    	$this->putHeaders();
		echo json_encode($query->result());
    }
}
?>