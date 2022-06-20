<?php
class User {

    function __construct($db) {
        $this->db = $db;
    }

    public function login($login, $password) {
        $user = $this->db->getUserByLoginPass($login, $password);
        if ($user) {
            $token = md5(rand());
            $this->db->updateToken($user['user_id'], $token);
            return array(
                'name' => $user['full_name'],
                'login' => $user['login'],
                'rules' => $user['rules'],
                'token' => $token
            );
        }
    }

    public function registration($name, $birthdate, $login, $password) {
        $user = $this->db->getUserByLogin($login);
        if (!$user) {

            $this->db->addNewUser($name, $birthdate, $login, $password);
            return $this->login($login, $password);
        }
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if($user){
            $this->db->updateToken($user['user_id'], NULL);
            return true;
        }
    }

    public function getUserByLogin($login){
        return $this->db->getUserByLogin($login);
    }

	public function getUserByToken($token){
		return $this->db->getUserByToken($token);
	}

    public function getUserById($user_id){
        return $this->db->getUserById($user_id);
    }

    public function sendComment($user, $article_id ,$comment){
        $user = $this->db->getUserByToken($user);
        return $this->db->sendComment($user['user_id'], $article_id, $comment);
    }

    public function deleteComment($login, $comment){
        $user_id = $this->db->getUserByLogin($login);
        return $this->db->deleteComment($user_id['user_id'], $comment);
    }
}