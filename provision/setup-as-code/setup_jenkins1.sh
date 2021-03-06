#!/bin/bash

# Jenkins1に「前提となる設定」を流し込むスクリプト。
# jobや履歴情報は、別データで放り込むイメージ。

JENKINS_URL='http://localhost:8080'
PLUGINS='git build-pipeline-plugin clone-workspace-scm'

# Jenkins自体からjenkins-cli.jarを吐き出させる
curl "$JENKINS_URL/jnlpJars/jenkins-cli.jar" > ./jenkins-cli.jar

# Pluginインストール

# プラグイン群
# https://updates.jenkins-ci.org/latest/ から、対応する名前を探し、".hpi"を取り除いたのがプラグイン名。
java -jar jenkins-cli.jar -s $JENKINS_URL install-plugin $PLUGINS

# 再起動
java -jar jenkins-cli.jar -s $JENKINS_URL safe-restart
