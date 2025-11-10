package com.aep2.Aprendizagem.Continua.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alunoId;

    private String nome;

    private String RA;

    public Aluno() {}

    public Long getAlunoId() {return alunoId;}

    public void setAlunoId(Long alunoId) {this.alunoId = alunoId;}

    public String getNome() {return nome;}

    public void setNome(String nome) {this.nome = nome;}

    public String getRA() {return RA;}

    public void setRA(String RA) {this.RA = RA;}
}
