# lambda tutorial

- https://code.mendhak.com/lambda-docker-hello-world/
- https://github.com/mendhak/lambda-docker-hello-world

```sh
aws iam create-role --role-name lambda-ex --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"},
    "Action": "sts:AssumeRole"}]
  }'


docker build -t lambda-docker-hello-world .

# test locally
docker run --rm -p 8080:8080 lambda-docker-hello-world

# invoke local lambda
aws lambda invoke \
--region eu-west-1 \
--endpoint http://localhost:8080 \
--no-sign-request \
--function-name function \
--cli-binary-format raw-in-base64-out \
--payload '{"a":"b"}' output.txt

# push your docker image to ECR
ECR_URL="xxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com" && aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin $ECR_URL

# Retag the image we built above to match ECR’s format. Then push the image up.
docker tag lambda-docker-hello-world:latest $ECR_URL/lambda-docker-hello-world:latest
docker push $ECR_URL/lambda-docker-hello-world:latest

# deploy
aws lambda create-function \
--package-type Image \
--function-name lambda-docker-hello-world \
--role arn:aws:iam::xxxxxxxxx:role/lambda-ex \
--code ImageUri=xxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/lambda-docker-hello-world:latest

# invoke real lambda
REGION="eu-west-1" &&
aws lambda \
--region $REGION invoke \
--function-name lambda-docker-hello-world \
--cli-binary-format raw-in-base64-out \
--payload '{"a":"b"}' \
output.txt

# show output
cat output.txt

```
