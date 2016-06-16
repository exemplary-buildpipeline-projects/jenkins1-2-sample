node {

    // 設定値系

    HOST_DEV = 'zndkdev.jap.ph'
    HOST_PRD = 'zndk.jpn.ph'

    USER='ec2-user'
    KEY='/etc/key.pem'

    // 実処理

    stage '1.テスト'
    
    git url: 'https://github.com/exemplary-buildpipeline-projects/jenkins1-2-sample.git'
    
    def mvnHome = tool 'latest'
    
    sh "${mvnHome}/bin/mvn clean test"
    
    stage '2.ビルド'
    
    sh "${mvnHome}/bin/mvn clean  package spring-boot:repackage -Dmaven.test.skip=true"

    stage '3.開発環境デプロイ'
        
    deploy("${USER}@${HOST_DEV}"  , KEY)

    stage '4.人間の判断'
    
    input message: '本番環境へのデプロイはどうします？', ok: 'する'

    stage '5.本番環境デプロイ'
    
    deploy("${USER}@${HOST_PRD}"  , KEY)

}

def deploy(userAndServer , keyFile) {

    def ssh = "ssh -i ${keyFile} ${userAndServer}"
    def scp = "scp -i ${keyFile}"

   // 前の殺す＆ファイル削除
    sh "${ssh} 'killall java ; rm -f ./*.jar'"
    
    // 送り込む
    sh "${scp} ./target/*.jar ${userAndServer}:./"
    
    // javaコマンドでspring-bootアプリを起動
    sh "${scp} ./startup.sh  ${userAndServer}:./"
    sh "${ssh} 'chmod +x ./startup.sh'"

    // アプリ実行    
    sh "${ssh} './startup.sh'"
    
}