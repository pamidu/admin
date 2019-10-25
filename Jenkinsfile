pipeline {
    agent any
    // environment  {
    //     OLDER_TASK = sh (
    // script: "{aws ecs list-tasks --cluster SI-Dev-Cluster --desired-status RUNNING --family APIGW | egrep "task/" | sed -E "s/.*task\/(.*)\"/\1/"}",
    // returnStatus: true
    // ) == 0
    // echo "TASK ID: ${OLDER_TASK}"
    // }
    stages {
        stage('Build ID') {
            steps {
                sh('echo ${BUILD_NUMBER}')
                //sh('./gradlew clean build --refresh-dependencies')
                            }
        }
        stage('Build Docker Image') {
            steps {
               sh('/usr/bin/docker build -t 767257458946.dkr.ecr.us-east-1.amazonaws.com/learn:apache .')
               //sh('ls -al')
            }
        }
        stage('Re-init ECR Auth Token') {
            steps {
               //sh('aws ecr get-login --no-include-email --region us-east-1 --no-include-email > auth-token.sh')
               sh('/bin/chmod +x auth-token.sh')
               sh('/bin/sh ./auth-token.sh')
            }
        }
        stage('Push Docker Image') {
            steps {
                
                sh('docker push 767257458946.dkr.ecr.us-east-1.amazonaws.com/learn:apache')
                
               

            }
        }
         stage('ECS Deploynment')   {
             steps {  
             sh('/bin/sh ./ecs.sh')
            }
        }
    }
}

