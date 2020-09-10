package com.itlize.dao;

import com.itlize.entity.Resources;
import com.itlize.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class ResourceDAOImp implements ResourceDAO {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public List<Resources> getResources() {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<Resources> cq = cb.createQuery(Resources.class);
        Root< Resources > root = cq.from(Resources.class);
        cq.select(root);
        Query query = session.createQuery(cq);
        return query.getResultList();
    }
}
