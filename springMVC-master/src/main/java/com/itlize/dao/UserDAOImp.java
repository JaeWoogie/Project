package com.itlize.dao;

import java.util.List;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.itlize.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAOImp implements UserDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List <Users> getUsers() {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery < Users > cq = cb.createQuery(Users.class);
        Root < Users > root = cq.from(Users.class);
        cq.select(root);
        Query query = session.createQuery(cq);
        return query.getResultList();
    }
    

    @Override
    public Users getUser(int theId) {
        Session currentSession = sessionFactory.getCurrentSession();
        Users theUser = currentSession.get(Users.class, theId);
        return theUser;
    }
}