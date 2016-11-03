#!/bin/bash

# ビルドもするなら、以下
# mvn clean jar:jar

# サーバ内でのアプリ起動。
nohup java -jar ./*.jar > ./app.log &


# 別の話として「デバッグする」なら、mvnのSpring Boot立ち上げコマンドで。
mvn clean test spring-boot:run

