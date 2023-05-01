# Build
FROM node:19-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g http-server
COPY . .
RUN npm run build

# Production
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
