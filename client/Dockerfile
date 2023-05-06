FROM node:14.14.0-alpine
WORKDIR /client
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm build


FROM nginx
EXPOSE 8081
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
