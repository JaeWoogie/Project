package com.itlize.service;

import com.itlize.entity.Users;

import java.util.List;



public interface UserServiceInterface {

    public List <Users> getUsers();


    public Users getUser(int theId);


}