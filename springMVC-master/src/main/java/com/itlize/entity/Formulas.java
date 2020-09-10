package com.itlize.entity;

import javax.persistence.*;

@Entity
public class Formulas {
    private int formulaId;
    private String formula;
    private Templates templateId;

    public Formulas() {
    }

    @OneToOne
    @JoinColumn(name = "template_id")
    public Templates getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Templates templateId) {
        this.templateId = templateId;
    }

    @Id
    @Column(name = "formula_id", nullable = false)
    public int getFormulaId() {
        return formulaId;
    }

    public void setFormulaId(int formulaId) {
        this.formulaId = formulaId;
    }



    @Basic
    @Column(name = "formula", nullable = false, length = 255)
    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Formulas formulas = (Formulas) o;

        if (formulaId != formulas.formulaId) return false;
        if (formula != null ? !formula.equals(formulas.formula) : formulas.formula != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = formulaId;
        result = 31 * result + (formula != null ? formula.hashCode() : 0);
        return result;
    }
}
