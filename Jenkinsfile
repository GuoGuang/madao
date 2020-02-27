pipeline {
  agent any
  tools {nodejs "nodejs"}
  environment {
        // 阿里云docker仓库凭证 ：这是jenkins管理界面中定义的凭证名称为“aliyun-docker”
        // FRESH_CREDS = credentials('aliyun-docker')
        // BUILD_NUMBER = credentials('aliyun-docker')
        // 仓库docker 地址、镜像名、容器名称
        FRESH_HOST = 'registry.cn-hongkong.aliyuncs.com'
        REMOTE_IP = "139.9.155.54"
        DOCKER_IMAGE = 'code_blog'
        DOCKER_CONTAINER = 'codeif-blog'
        REMOTE_SCRIPT = 'sshpass -f /var/jenkins_home/password.txt ssh -t -t -o StrictHostKeyChecking=no root@139.9.155.54'
        //测试人员邮箱地址【参数值对外隐藏】
        QA_EMAIL = '1831682775@qq.com'
        BUILD_USER_EMAIL = '1831682775@qq.com'
        BUILD_USER  = '构建人'
        //接口测试（网络层）的job名，一般由测试人员编写
        ITEST_JOBNAME = 'InterfaceTest_ExpertPatient'
        //git服务全系统只读账号cred_id【参数值对外隐藏】
        CRED_ID='*****-****-****-****-*********'
    }
  stages {
     stage('获取代码') {
       steps {
            sh "rm -rf ./*"
            // git credentialsId: '*****-****-****-****-*********', url: 'https://github.com/GuoGuang/codeif.git', branch: 'dev'
            sh "git clone --depth 1 -b dev https://gitee.com/guoguang0536/codeif.git"
            
        }
     }
    stage('Docker打包推送') {
            steps {
                dir(path: "/${WORKSPACE}/codeif") {
                    sh "pwd"
                    sh "docker build -t codeif:${env.BUILD_ID} ."
                    echo '-->> 3#构建成功-->>'
                    sh "docker login --username=1831682775@qq.com --password ${DOCKER_HUB_PASSWORD} registry.cn-hangzhou.aliyuncs.com"
                    sh "docker tag codeif:${env.BUILD_ID} registry.cn-hangzhou.aliyuncs.com/codeif/${DOCKER_IMAGE}:${env.BUILD_ID}"
                    script {
                        sh "docker push registry.cn-hangzhou.aliyuncs.com/codeif/${DOCKER_IMAGE}:${env.BUILD_ID}"
                        echo "构建并推送到远程服务器成功--->"
                    }
                }
            }
        } 
        stage('远程Docker拉取并构建') {
            steps {
                sh "pwd"
                sh "apt-get update"
                sh "apt-get install sshpass"
                script {
                    // 停止并删除列表中有 ${DOCKER_CONTAINER} 的容器
                    def container = sh(returnStdout: true, script: "${REMOTE_SCRIPT} docker ps -a | grep $DOCKER_CONTAINER | awk '{print \$1}'").trim()
                    if (container.size() > 0) {
                        sh "${REMOTE_SCRIPT} docker ps -a | grep $DOCKER_CONTAINER | awk  '{print \$1}' | xargs docker stop"
                        sh "${REMOTE_SCRIPT} docker ps -a | grep $DOCKER_CONTAINER | awk '{print \$1}' | xargs docker rm"
                        echo '-->> 1#停止并删除容器 -->>'
                    }
                    // 删除列表中有 ${DOCKER_IMAGE} 的镜像
                    def image = sh(returnStdout: true, script: "${REMOTE_SCRIPT} docker images | grep $DOCKER_IMAGE | awk '{print \$3}'").trim()
                    if (image.size() > 0) {
                        sh "${REMOTE_SCRIPT} docker images | grep $DOCKER_IMAGE | awk '{print \$3}' | xargs docker rmi -f"
                        echo '-->> 2#停止并删除镜像 -->>'
                    }
                }

                sh "${REMOTE_SCRIPT} pwd "
                sh "${REMOTE_SCRIPT} docker -v "
                sh "${REMOTE_SCRIPT} docker login --username=1831682775@qq.com --password ${DOCKER_HUB_PASSWORD} registry.cn-hangzhou.aliyuncs.com"
                sh "${REMOTE_SCRIPT} docker pull registry.cn-hangzhou.aliyuncs.com/codeif/code_blog:${env.BUILD_ID}"
                sh "${REMOTE_SCRIPT} docker run -p 3000:3000 --name ${DOCKER_IMAGE} -d registry.cn-hangzhou.aliyuncs.com/codeif/code_blog:${env.BUILD_ID}"
                echo '-->> #远程主机构建成功-->>'
                
            }
        }

      }
    }
