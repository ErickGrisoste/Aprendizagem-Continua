package com.aep2.Aprendizagem.Continua.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

=======
>>>>>>> 2924c5a716942e07582dcdcc194bed9361dffd5f
import jakarta.persistence.*;

import java.util.List;

@Entity
<<<<<<< HEAD
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "disciplinaId"
)
=======
>>>>>>> 2924c5a716942e07582dcdcc194bed9361dffd5f
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long disciplinaId;
    private String nome;
    private String professor;

    @OneToMany(mappedBy = "disciplina", cascade = CascadeType.ALL)
<<<<<<< HEAD
=======
    @JsonBackReference
>>>>>>> 2924c5a716942e07582dcdcc194bed9361dffd5f
    private List<Material> materiais;


    public Disciplina() {}

    public Long getDisciplinaId() {
        return disciplinaId;
    }

    public void setDisciplinaId(Long disciplinaId) {
        this.disciplinaId = disciplinaId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }

    public List<Material> getMateriais() {
        return materiais;
    }

    public void setMateriais(List<Material> materiais) {
        this.materiais = materiais;
    }
}
