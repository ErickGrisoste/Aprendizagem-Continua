package com.aep2.Aprendizagem.Continua.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long professorId;

    private String nome;

    private String RA;

    public Professor() {}

    public Long getProfessorId() {return professorId;}

    public void setProfessorId(Long professorId) {this.professorId = professorId;}

    public String getNome() {return nome;}

    public void setNome(String nome) {this.nome = nome;}

    public String getRA() {return RA;}

    public void setRA(String RA) {this.RA = RA;}
}
