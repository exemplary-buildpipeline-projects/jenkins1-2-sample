package com.github.kazuhito_m.db;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ZUNDOKO_HISTORY")
@Data
public class ZundokoHistoryEntity {

    @Id
    @Column(name = "CLIENT_KEY")
    private String clientKey;

    @Lob
    @Column(name = "HISTORY")
    private String history;

}
