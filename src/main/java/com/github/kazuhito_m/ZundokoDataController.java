package com.github.kazuhito_m;

import com.github.kazuhito_m.db.ZundokoHistoryEntity;
import com.github.kazuhito_m.db.ZundokoHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZundokoDataController {

    private Logger logger = LoggerFactory.getLogger(ZundokoDataController.class);

    @Autowired
    private ZundokoHistoryRepository repository;


    @RequestMapping("loadJson")
    public String loadJson(@RequestParam String key) {

        logger.debug("loadJson(key=" + key);
        System.out.println("loadJson(key=" + key);

        String res = "[]";


        // DBからキーによる値の取得
        ZundokoHistoryEntity e = repository.findOne(key);

        if (e != null) {
            res = e.getHistory();
        }

        System.out.println("res=" + res);

        return res;
    }

    @RequestMapping("saveJson")
    public String saveJson(@RequestParam String key, @RequestParam String json) {

        logger.debug("saveJson(key=" + key + ",json=" + json);
        System.out.println("saveJson(key=" + key + ",json=" + json);

        ZundokoHistoryEntity e = new ZundokoHistoryEntity();
        e.setClientKey(key);
        e.setHistory(json);

        repository.save(e);

        return "ok";
    }

}

