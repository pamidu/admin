#!/bin/bash


# OLDER_TASK=$(aws ecs list-tasks --cluster SI-Dev-Cluster --desired-status RUNNING --family APIGW | egrep "task/" | sed -E "s/.*task\/(.*)\"/\1/")
# echo "Older Task running  " + $OLDER_TASK
# aws ecs stop-task --cluster SI-Dev-Cluster --task ${OLDER_TASK}
# aws ecs update-service --cluster "SI-Dev-Cluster" --service "api-gw-service" --task-definition "APIGW":"1" --desired-count 1 --force-new-deployment
#admin-portal-td.json
#!/bin/bash
SERVICE_NAME="AdminPortal"
IMAGE_VERSION="v_"${BUILD_NUMBER}
TASK_FAMILY="ADMINPORTAL"

# Create a new task definition for this build
sed -e "s;%BUILD_NUMBER%;${BUILD_NUMBER};g" admin-portal-td.json > admin-portal-td-v_${BUILD_NUMBER}.json
aws ecs register-task-definition --family ADMINPORTAL --cli-input-json file://admin-portal-td-v_${BUILD_NUMBER}.json

# Update the service with the new task definition and desired count
TASK_REVISION=`aws ecs describe-task-definition --task-definition ADMINPORTAL | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//'`
DESIRED_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} | egrep "desiredCount" | tr "/" " " | awk '{print $2}' | sed 's/,$//'`
echo $DESIRED_COUNT
# if [ ${DESIRED_COUNT} = "0" ]; then
#     DESIRED_COUNT="1"
# fi

# aws ecs update-service --cluster SI-Dev-Cluster --service ${SERVICE_NAME} --task-definition ${TASK_FAMILY}:${TASK_REVISION} --desired-count ${DESIRED_COUNT}
OLDER_TASK=$(aws ecs list-tasks --cluster SI-Dev-Cluster --desired-status RUNNING --family ADMINPORTAL | egrep "task/" | sed -E "s/.*task\/(.*)\"/\1/")
echo "Older Task running  " + $OLDER_TASK
aws ecs stop-task --cluster SI-Dev-Cluster --task ${OLDER_TASK}
aws ecs update-service --cluster SI-Dev-Cluster --service ${SERVICE_NAME} --task-definition ${TASK_FAMILY}:${TASK_REVISION} --desired-count "1"