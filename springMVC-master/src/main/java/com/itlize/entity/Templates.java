package com.itlize.entity;

import javax.persistence.*;

@Entity
public class Templates {
    private int templateId;
    private String columnTitle;
    private String columnValue;
    private String dataType;
    private Byte isChecked;
    private Projects project;


    public Templates() {
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
    @Column(name = "template_id", nullable = false)
    public int getTemplateId() {
        return templateId;
    }

    public void setTemplateId(int templateId) {
        this.templateId = templateId;
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

    @Basic
    @Column(name = "data_type", nullable = false, length = 40)
    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    @Basic
    @Column(name = "isChecked", nullable = true)
    public Byte getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(Byte isChecked) {
        this.isChecked = isChecked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Templates templates = (Templates) o;

        if (templateId != templates.templateId) return false;
        if (columnTitle != null ? !columnTitle.equals(templates.columnTitle) : templates.columnTitle != null)
            return false;
        if (columnValue != null ? !columnValue.equals(templates.columnValue) : templates.columnValue != null)
            return false;
        if (dataType != null ? !dataType.equals(templates.dataType) : templates.dataType != null) return false;
        if (isChecked != null ? !isChecked.equals(templates.isChecked) : templates.isChecked != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = templateId;
        result = 31 * result + (columnTitle != null ? columnTitle.hashCode() : 0);
        result = 31 * result + (columnValue != null ? columnValue.hashCode() : 0);
        result = 31 * result + (dataType != null ? dataType.hashCode() : 0);
        result = 31 * result + (isChecked != null ? isChecked.hashCode() : 0);
        return result;
    }
}
