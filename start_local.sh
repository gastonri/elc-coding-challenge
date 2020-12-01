docker build -t react-elc-challenge:dev .

docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3030:3030 \
    -p 3035:3035 \
    -e CHOKIDAR_USEPOLLING=true \
    react-elc-challenge:dev