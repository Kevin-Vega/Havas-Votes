# Voted System
Description: System for to realizae votes


# Dependencies Install
npm i

## Run Project
- npm run dev
- npx nodemon src/index.ts


# Build Image
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/<PROJECT_ID>/<REPOSITORY>/<IMAGE_NAME>:<TAG> \
  --no-cache

  
# Deploy Project
gcloud run deploy <SERVICE_NAME> \
  --image=us-central1-docker.pkg.dev/<PROJECT_ID>/<REPOSITORY>/<IMAGE_NAME>:<TAG> \
  --region=us-central1 \
  --allow-unauthenticated \
  --add-cloudsql-instances=<PROJECT_ID>:us-central1:<INSTANCE_NAME> \
  --set-env-vars="NODE_ENV=production,DB_INSTANCE_NAME=/cloudsql/<PROJECT_ID>:us-central1:<INSTANCE_NAME>,DB_USER=<DB_USER>,DB_PASSWORD=<DB_PASSWORD>,DB_NAME=<DB_NAME>" \
  --port=8080



