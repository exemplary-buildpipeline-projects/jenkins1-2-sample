package com.github.kazuhito_m.db;


import com.github.kazuhito_m.App;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = App.class)
@WebAppConfiguration
public class ZundokoHistoryRepositoryTest {

    @Autowired
    private ZundokoHistoryRepository sut;

    @Test
    public void データベースへの保存と修得が出来る() throws Exception {

        ZundokoHistoryEntity e = new ZundokoHistoryEntity();
        e.setClientKey("12345");
        e.setHistory("[]");

        sut.save(e);

        List<ZundokoHistoryEntity> savedEList = sut.findAll();

        assertThat(savedEList.size(), is(1));

    }


    @Test
    public void データベースへの保存とPKを指定した検索が出来る() throws Exception {

        ZundokoHistoryEntity e = new ZundokoHistoryEntity();
        e.setClientKey("12345");
        e.setHistory("[]");

        sut.save(e);

        ZundokoHistoryEntity actual = sut.findOne("12345");

        assertThat(actual, is(notNullValue()));
        assertThat(actual.getClientKey(), is("12345"));
        assertThat(actual.getHistory(), is("[]"));

    }

}
