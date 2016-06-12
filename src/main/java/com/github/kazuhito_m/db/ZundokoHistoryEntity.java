package com.github.kazuhito_m.db;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "ZUNDOKO_HISTORY")
@Data
public class ZundokoHistoryEntity {


    @Id
    @Column(name = "CLIENT_KEY")
    private String clientKey;

    @Column(name = "HISTORY")
    private String history;

}
