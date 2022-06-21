<?php

class DB {
    function __construct() {
        $host = "127.0.0.1";
        $user = "root";
        $pass = ""; 
        $name = "review_bd";
        try {
            $this->conn = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            die();
        }
    }

    function __destruct() {
        $this->conn = null;
    }

    public function getUserByLogin($login) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE login='$login'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserByLoginPass($login, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE login='$login' AND password='$password'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserByToken($token) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE token='$token'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserById($user_id) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE user_id ='$user_id'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function updateToken($id, $token) {
        $stmt = $this->conn->prepare("UPDATE users SET token='$token' WHERE user_id=$id");
        $stmt->execute();
        return true; 
    }

    public function addNewUser($name, $birthdate, $login, $password) {
        $stmt = $this->conn->prepare("INSERT INTO users(full_name, login, birth_date, password) 
                                        VALUES('$name', '$login', '$birthdate', '$password')");
        $stmt->execute();
        return true; 
    }

    public function addReview($user_id, $name, $creation_date, $advantages, $disadvantages, $grade, $title_image){
        $stmt = $this->conn->prepare("INSERT INTO articles(user_id, name, creation_date, 
                                        advantages, disadvantages, grade, title_image) 
                    VALUES('$user_id', '$name', '$creation_date', '$advantages', '$disadvantages', '$grade', '$title_image')");
        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    public function addReviewUnit($article_id, $paragraph, $image, $subtitle){
        $stmt = $this->conn->prepare("INSERT INTO article_units(article_id, paragraph, image, subtitle) 
                VALUES('$article_id', '$paragraph', '$image', '$subtitle')");
        $stmt->execute();
        return true;
    }

    public function getReviews(){
        $stmt = $this->conn->prepare("SELECT * FROM articles");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getReview($article_id){
        $stmt = $this->conn->prepare("SELECT * FROM articles WHERE article_id = '$article_id'");
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getReviewByName($name){
        $stmt = $this->conn->prepare("SELECT * FROM articles WHERE name LIKE '%$name%'");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getReviewUnits($article_id){
        $stmt = $this->conn->prepare("SELECT * FROM article_units WHERE article_id = '$article_id'");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function deleteReview($article_id){
        $stmt = $this->conn->prepare("DELETE FROM article_units WHERE article_id ='$article_id';
                                    DELETE FROM articles WHERE article_id ='$article_id'");
        $stmt->execute();
        return true;
    }

    public function sendComment($user_id, $article_id, $comment){
        $stmt = $this->conn->prepare("INSERT INTO comments(user_id, article_id, comment) 
                                        VALUES('$user_id', '$article_id', '$comment')");
        $stmt->execute();
        return true;
    }

    public function deleteComment($user_id, $comment){
        $stmt = $this->conn->prepare("DELETE FROM comments WHERE user_id = '$user_id' AND comment = '$comment'");
        $stmt->execute();
        return true;
    }

    public function getComments($article_id){
        $stmt = $this->conn->prepare("SELECT comments.comment, users.login FROM comments 
                                    JOIN users ON users.user_id = comments.user_id  WHERE article_id = '$article_id' ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function banUser($user_id){
        $stmt = $this->conn->prepare("UPDATE users SET is_blocked = 1 WHERE user_id = '$user_id'");
        $stmt->execute();
        return true;
    }
}