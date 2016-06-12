package com.github.kazuhito_m.db;

import lombok.Data;


import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
@Data
public class ZundokoHistoryEntity {


    @Id
    private String clientKey;

    private String history;


}
