<?php 
include_once 'autoload.php';

function getList(){
$message=new Message();
$message->getList();
}
function addMessage(){
	$message=new Message();
	$message->add();
}
function getMore(){
	$message=new Message();
	$message->getMore();
}
if(!empty($_GET['f']))
{
	$function=$_GET['f'];
	$function();

}
