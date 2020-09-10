package com.itlize.service;

import java.util.List;

import com.itlize.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itlize.dao.UserDAO;

@Service
public class UserService implements UserServiceInterface {

    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public List <Users> getUsers() {
        return userDAO.getUsers();
    }

    @Override
    @Transactional
    public Users getUser(int theId) {
        return userDAO.getUser(theId);
    }

}