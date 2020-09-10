package com.itlize.entity;

import javax.persistence.*;

@Entity
public class Resources {
    private int resourceId;
    private int costCode;
    private String resourceName;
    private String columnTitle;
    private String columnValue;
    private Projects project;


    public Resources() {
    }

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "project_id")
    public Projects getProject(){
        return project;
    }
    public void setProject(Projects project){
        this.project = project;
    }


    @Id
    @Column(name = "resource_id", nullable = false)
    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    @Basic
    @Column(name = "cost_code", nullable = false)
    public int getCostCode() {
        return costCode;
    }

    public void setCostCode(int costCode) {
        this.costCode = costCode;
    }

    @Basic
    @Column(name = "resource_name", nullable = false, length = 255)
    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    @Basic
    @Column(name = "column_title", nullable = true, length = 255)
    public String getColumnTitle() {
        return columnTitle;
    }

    public void setColumnTitle(String columnTitle) {
        this.columnTitle = columnTitle;
    }

    @Basic
    @Column(name = "column_value", nullable = true, length = 255)
    public String getColumnValue() {
        return columnValue;
    }

    public void setColumnValue(String columnValue) {
        this.columnValue = columnValue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Resources resources = (Resources) o;

        if (resourceId != resources.resourceId) return false;
        if (costCode != resources.costCode) return false;
        if (resourceName != null ? !resourceName.equals(resources.resourceName) : resources.resourceName != null)
            return false;
        if (columnTitle != null ? !columnTitle.equals(resources.columnTitle) : resources.columnTitle != null)
            return false;
        if (columnValue != null ? !columnValue.equals(resources.columnValue) : resources.columnValue != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = resourceId;
        result = 31 * result + costCode;
        result = 31 * result + (resourceName != null ? resourceName.hashCode() : 0);
        result = 31 * result + (columnTitle != null ? columnTitle.hashCode() : 0);
        result = 31 * result + (columnValue != null ? columnValue.hashCode() : 0);
        return result;
    }
}
