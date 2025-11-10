package com.aep2.Aprendizagem.Continua.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long administradorId ;

    private String nome;

    public Administrador() {}

    public Long getAdministradorId() {return administradorId;}

    public void setAdministradorId(Long administradorId) {this.administradorId = administradorId;}

    public String getNome() {return nome;}

    public void setNome(String nome) {this.nome = nome;}
}
