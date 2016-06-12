package com.github.kazuhito_m;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZundokoDataController {

    private Logger logger = LoggerFactory.getLogger(ZundokoDataController.class);


    @RequestMapping("loadJson")
    public String loadJson(@RequestParam String key) {

        logger.debug("loadJson(key=" + key);
        System.out.println("loadJson(key=" + key);


        return "[{\"no\":7,\"line\":\"ドコドコズンズンズンドコドコドコドコズンズンズンズンズンズンドコキ・ヨ・シ！\",\"count\":16},{\"no\":6,\"line\":\"ズンズンドコドコドコドコズンドコズンドコズンドコドコドコドコズンズンドコドコズンドコズンドコズンドコズンズンドコドコドコズンズンズンドコズンドコドコドコズンドコズンドコドコズンズンズンドコズンドコズンドコドコドコドコドコドコドコドコズンドコズンドコドコドコドコズンズンズンドコズンドコズンズンドコドコズンドコドコドコドコズンドコドコドコドコズンズンズンズンドコキ・ヨ・シ！\",\"count\":90},{\"no\":5,\"line\":\"ドコドコドコズンドコズンズンズンズンズンズンドコキ・ヨ・シ！\",\"count\":12},{\"no\":4,\"line\":\"ズンドコドコズンドコドコドコズンドコズンドコドコズンズンドコドコズンドコズンズンドコズンズンズンドコドコドコドコズンズンズンドコドコズンドコズンズンドコズンズンドコドコドコズンドコドコドコズンズンズンズンズンドコキ・ヨ・シ！\",\"count\":53},{\"no\":3,\"line\":\"ドコズンズンドコズンズンズンドコズンズンズンズンズンズンズンズンズンズンドコキ・ヨ・シ！\",\"count\":19},{\"no\":2,\"line\":\"ドコドコドコドコドコズンドコズンドコズンズンズンドコドコズンズンズンズンドコキ・ヨ・シ！\",\"count\":19},{\"no\":1,\"line\":\"ズンズンドコズンズンドコドコドコズンズンズンズンズンドコキ・ヨ・シ！\",\"count\":14}]";
    }

    @RequestMapping("saveJson")
    public String saveJson(@RequestParam String key, @RequestParam String json) {

        logger.debug("saveJson(key=" + key + ",json=" + json);
        System.out.println("saveJson(key=" + key + ",json=" + json);

        return "ok";
    }

}

