package com.ecdc.showpi.persistence;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecdc.showpi.domain.Produto;

@Repository
public interface ProdutoRepository extends CrudRepository<Produto, Long> {

}
