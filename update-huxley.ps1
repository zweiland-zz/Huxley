Write-Host "Stopping Huxley V1"
docker stop huxley_v1

Write-Host "Removing Huxley V1"
docker rm huxley_v1

Write-Host "Building Huxley image"
docker build -t huxley .

Write-Host "Starting Huxley V1"
docker run -d -p 8080:80 --name huxley_v1 huxley