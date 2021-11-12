# Use official nginx image as the base image
FROM nginx:alpine
# FROM nginx:1.17.1-alpine
COPY ./dist/mancala-ui /usr/share/nginx/html
# Expose port 80
EXPOSE 80