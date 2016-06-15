# インターネット(AWS)上のJenkins

## What's this ?

- ここは、Jenkins用サーバの「Infrastracuture As Code」しているファイル群です
- Windows ではなく Linux です
    - Amazon Linux向け

## 完成後の接続情報

### URL

- Jenkins : http:/[aws-hostname]:8080/

## 前提

以下は「プロビジョニングの実行元ホスト(プロビジョニング対象とは異なる)」に予め行っている前提の設定です。

(対象のホスト内からでも可)


- git,anshible

※ContOS6系の例

```bash
yum update
yum install epel-release
yum install git
yum install ansible --enablerepo=epel-testing
```

## プロビジョニング実行方法

上記前提を整えた状態で、このREADMEが在るディレクトリで、以下を実行してください。

```bash
ansible-playbook --private-key=XXX.pem -i hosts -u root main.yml
```
## プロビジョニング後の手動作業

### Jenkinsの設定

