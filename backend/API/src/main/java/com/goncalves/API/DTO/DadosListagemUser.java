package com.goncalves.API.DTO;

import com.goncalves.API.entities.Users;

import java.time.LocalDateTime;

public record DadosListagemUser(String idUser,
                                String username,
                                String firstName,
                                String lastName,
                                String email,
                                String password,
                                String birth,
                                LocalDateTime creationAccount) {
    public DadosListagemUser(Users users) {
        this(users.getUsername(), users.getIdUsers(), users.getFirstName(), users.getLastName(), users.getEmail(), users.getPassword(), users.getBirth(), users.getCreationAccount());
    }
}
