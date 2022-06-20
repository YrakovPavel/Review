<?php

error_reporting(-1);

require_once ('application/db/DB.php');
require_once ('application/user/User.php');

function router($params) {
    $db = new DB();
    $user = new User($db);
    $method = $params ['method'];
    if ($method) {
        switch ($method) {
            // user
            case 'login' : 
                if($params['login'] && $params ['password']) {
                    return $user->login($params['login'], $params['password']);
                }
            case 'logout' : 
                if($params['token']) {
                    return $user->logout($params['token']);
                }	
            case 'registration' : 
                if($params['name'] &&  $params['birthdate'] 
                    && $params['login'] && $params ['password']) {
                        return $user->registration($params['name'], $params['birthdate'],
                            $params['login'], $params ['password']);
                }
            case 'getUserByToken':
                if ($params['token']){
                    return $user->getUserByToken($params['token']);
                }
            case 'getUserById':
                if ($params['user_id']){
                    return $user->getUserById($params['user_id']);
                }
            case 'getReviews':
                return $db->getReviews();
            case 'getReview':
                if ($params['article_id']){
                    return $db->getReview($params['article_id']);
                }
            case 'getReviewByName':
                if ($params['name']){
                    return $db->getReviewByName($params['name']);
                }
            case 'getReviewUnits':
                if ($params['article_id']){
                    return $db->getReviewUnits($params['article_id']);
                }
            case 'deleteReview':
                if ($params['article_id']){
                    return $db->deleteReview($params['article_id']);
                }
            case 'sendComment':
                if ($params['user_id'] && $params['article_id'] && $params['comment']){
                    return $user->sendComment($params['user_id'], $params['article_id'], $params['comment']);
                }
            case 'deleteComment':
                if ($params['login'] && $params['comment']){
                    return $user->deleteComment($params['login'], $params['comment']);
                }
            case 'getComments':
                if ($params['article_id']){
                    return $db->getComments($params['article_id']);
                }
        }
    }
    return false;
}

function answer($data) {
    if ($data){
        return array(
            'result' =>'ok',
            'data' => $data
        );
    }
    return array ('result' => 'error');
}

echo json_encode(answer(router($_GET)));


