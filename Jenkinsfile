pipeline {
  agent any
  stages {
    stage('获取代码') {
      steps {
        echo "开始从 ${params.repoUrl} 获取代码......"
        sh 'git clone -b dev git@github.com:GuoGuang/codeif.git'
      }
    }

    stage('Docker构建') {
      steps {
        sh "sshpass -f /var/jenkins_home/password.txt ssh -t -t -o StrictHostKeyChecking=no root@${REMOTE_IP} free total -g "
        sh "${REMOTE_SCRIPT} free total -g "
        script {
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

        sh 'pwd'
        sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
        sh "docker run -p 3000:3000 --name ${DOCKER_CONTAINER} -d ${DOCKER_IMAGE}:${env.BUILD_ID}"
        echo '-->> 3#构建成功-->>'
      }
    }

  }
  tools {
    nodejs 'nodejs'
  }
}