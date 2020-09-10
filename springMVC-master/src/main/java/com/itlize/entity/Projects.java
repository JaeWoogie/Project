package com.itlize.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Projects {
    private int projectId;
    private String projectName;
    private List<Resources> resource = new ArrayList<>();
    private List<Templates> template = new ArrayList<>();


    public Projects() {
    }

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "project", cascade = CascadeType.ALL)
    public List<Resources> getResources() {
        return resource;
    }
    public void setResources(List<Resources> resource) {
        this.resource = resource;
    }

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "project", cascade = CascadeType.ALL)
    public List<Templates> getTemplates() {
        return template;
    }
    public void setTemplates(List<Templates> template) {
        this.template = template;
    }


    @Id
    @Column(name = "project_id", nullable = false)
    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }


    @Basic
    @Column(name = "project_name", nullable = false, length = 255)
    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Projects projects = (Projects) o;

        if (projectId != projects.projectId) return false;
        if (projectName != null ? !projectName.equals(projects.projectName) : projects.projectName != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = projectId;
        result = 31 * result + (projectName != null ? projectName.hashCode() : 0);
        return result;
    }
}
