package com.itlize.dao;

import java.util.List;

import com.itlize.entity.Users;

public interface UserDAO {

    public List < Users > getUsers();


    public Users getUser(int theId);

}