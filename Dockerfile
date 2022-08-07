FROM maven:3.8.5-openjdk-17 as build
WORKDIR /build
COPY ./backend /build
CMD mvn clean package

FROM node:15 as build-frontend
WORKDIR /build
COPY ./frontend /build
RUN npm install
RUN npx quasar build

FROM openjdk:17.0.2 as app
WORKDIR /app
COPY --from=build /build/target/*.jar /app/app.jar
COPY --from=build-frontend /build/dist/spa/ /app/static/
CMD java -jar app.jar --spring.web.resources.static-locations=file:/app/static
