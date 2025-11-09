package com.aep2.Aprendizagem.Continua.repository;

import com.aep2.Aprendizagem.Continua.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByDisciplinaDisciplinaId(Long disciplinaId);
}
