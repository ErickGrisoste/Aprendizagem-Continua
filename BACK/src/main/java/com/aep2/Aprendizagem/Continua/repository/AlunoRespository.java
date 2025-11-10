package com.aep2.Aprendizagem.Continua.repository;

import com.aep2.Aprendizagem.Continua.model.Aluno;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRespository extends JpaRepository<Aluno, Long> {
}
