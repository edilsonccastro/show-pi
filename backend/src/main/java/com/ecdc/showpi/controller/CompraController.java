package com.ecdc.showpi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecdc.showpi.dao.CompraDAO;
import com.ecdc.showpi.service.ProdutoService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/compra")
public class CompraController {

    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity<?> efetuarCompra(@RequestBody List<CompraDAO> compras) {
        try {
            service.efetuarCompra(compras);
            return ResponseEntity.ok("Compra efetuada com sucesso");
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest()
                .body(exception.getMessage());
        }
    }

}
