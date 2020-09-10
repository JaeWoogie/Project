package com.itlize.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class Users {
    private int userId;
    private String userName;
    private String password;
    private String title;
    private Date registeredDate;
    private byte isAdmin;

    public Users() {
    }

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "user_name", nullable = true, length = 45)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 45)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "title", nullable = false, length = 45)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "registered_date", nullable = true)
    public Date getRegisteredDate() {
        return registeredDate;
    }

    public void setRegisteredDate(Date registeredDate) {
        this.registeredDate = registeredDate;
    }

    @Basic
    @Column(name = "isAdmin", nullable = false)
    public byte getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(byte isAdmin) {
        this.isAdmin = isAdmin;
    }

    @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Users users = (Users) o;

            if (userId != users.userId) return false;
            if (isAdmin != users.isAdmin) return false;
            if (userName != null ? !userName.equals(users.userName) : users.userName != null) return false;
            if (password != null ? !password.equals(users.password) : users.password != null) return false;
            if (title != null ? !title.equals(users.title) : users.title != null) return false;
            if (registeredDate != null ? !registeredDate.equals(users.registeredDate) : users.registeredDate != null)
                return false;

            return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (registeredDate != null ? registeredDate.hashCode() : 0);
        result = 31 * result + (int) isAdmin;
        return result;
    }
}
