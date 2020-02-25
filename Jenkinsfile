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
        DOCKER_IMAGE = 'codeif-blog'
        REMOTE_SCRIPT = 'sshpass -f /var/jenkins_home/password.txt ssh -t -t -o StrictHostKeyChecking=no root@${REMOTE_IP}'
        DOCKER_CONTAINER = 'codeif-blog'
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
            sh "git clone -b dev https://github.com/GuoGuang/codeif.git"
            sh "git clone -b dev git@github.com:GuoGuang/codeif.git"
        }
     }
    stage('Docker构建') {
            steps {
                sh "sshpass -f /var/jenkins_home/password.txt ssh -t -t -o StrictHostKeyChecking=no root@${REMOTE_IP} free total -g "
                sh "${REMOTE_SCRIPT} free total -g "
                script {
                    // 停止并删除列表中有 ${DOCKER_CONTAINER} 的容器
                    def container = sh(returnStdout: true, script: "docker ps -a | grep $DOCKER_CONTAINER | awk '{print \$1}'").trim()
                    if (container.size() > 0) {
                        sh "docker ps -a | grep $DOCKER_CONTAINER | awk  '{print \$1}' | xargs docker stop"
                        sh "docker ps -a | grep $DOCKER_CONTAINER | awk '{print \$1}' | xargs docker rm"
                        echo '-->> 1#停止并删除容器 -->>'
                    }
                    // 删除列表中有 ${DOCKER_IMAGE} 的镜像
                    def image = sh(returnStdout: true, script: "docker images | grep $DOCKER_IMAGE | awk '{print \$3}'").trim()
                    if (image.size() > 0) {
                        sh "docker images | grep $DOCKER_IMAGE | awk '{print \$3}' | xargs docker rmi"
                        echo '-->> 2#停止并删除镜像 -->>'
                    }
                }
                // 构建镜像
              
                sh "pwd"
                sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
                // 运行容器
                sh "docker run -p 3000:3000 --name ${DOCKER_CONTAINER} -d ${DOCKER_IMAGE}:${env.BUILD_ID}"
                echo '-->> 3#构建成功-->>'
            }
        }
     
  }
}
