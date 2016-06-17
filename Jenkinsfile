node {
   stage '1.テスト'

   git url: 'https://github.com/exemplary-buildpipeline-projects/jenkins1-2-sample.git'

   def mvnHome = tool 'latest'

   sh "${mvnHome}/bin/mvn clean test"

    stage '2.ビルド'
    
   sh "${mvnHome}/bin/mvn clean package spring-boot:repackage -Dmaven.test.skip=true"

    stage '3.開発環境にデプロイ'
    
    HOST_DEV='zndkdev.jpn.ph'
    USER='ec2-user'
    KEY='/etc/key.pem'
    
    SEND_TARGET="${USER}@${HOST_DEV}"
    SSH="ssh -i ${KEY} ${SEND_TARGET}"
    
    // 以前起動していたアプリをデストローイ＆ファイル削除
    sh "${SSH} 'killall java ; rm -f ./*.jar'"
    
    // 実行バイナリをサーバに送り込む
    sh "scp -i ${KEY} ./target/*.jar ${SEND_TARGET}:./"
    
    // javaを蹴るスクリプトをサーバに送り込む
    sh "scp -i ${KEY} ./startup.sh  ${SEND_TARGET}:./"
    sh "${SSH} 'chmod +x ./startup.sh'"
    
    // アプリ実行
    sh "${SSH} './startup.sh'"
    
    stage '4.人間の判断'
    
    input message: '本番環境にデプロイします？', ok: 'はい！します！'
    
    stage '5.本番環境デプロイ'
    
    HOST_DEV='zndk.jpn.ph'

    SEND_TARGET="${USER}@${HOST_DEV}"
    SSH="ssh -i ${KEY} ${SEND_TARGET}"
    
    // 以前起動していたアプリをデストローイ＆ファイル削除
    sh "${SSH} 'killall java ; rm -f ./*.jar'"
    
    // 実行バイナリをサーバに送り込む
    sh "scp -i ${KEY} ./target/*.jar ${SEND_TARGET}:./"
    
    // javaを蹴るスクリプトをサーバに送り込む
    sh "scp -i ${KEY} ./startup.sh  ${SEND_TARGET}:./"
    sh "${SSH} 'chmod +x ./startup.sh'"
    
    // アプリ実行
    sh "${SSH} './startup.sh'"
    

}
