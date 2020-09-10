package com.itlize.service;

import com.itlize.dao.ResourceDAO;
import com.itlize.dao.UserDAO;
import com.itlize.entity.Resources;
import com.itlize.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResourceService implements ResourceServiceInterface {
    @Autowired
    private ResourceDAO resourceDAO;

    @Override
    @Transactional
    public List<Resources> getResources() {
        return resourceDAO.getResources();
    }


}
