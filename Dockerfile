FROM maven:3.8.5-openjdk-17 as build
WORKDIR /build

COPY ./backend/pom.xml /build/pom.xml
RUN mvn verify --fail-never

COPY ./backend /build
RUN mvn -DskipTests=true package



FROM node:16 as build-frontend
WORKDIR /build

COPY ./frontend/package.json /build/package.json
COPY ./frontend/package-lock.json /build/package-lock.json
RUN npm install

COPY ./frontend /build
RUN npx quasar build



FROM openjdk:17.0.2 as app
WORKDIR /app
COPY --from=build /build/target/*.jar /app/app.jar
COPY --from=build-frontend /build/dist/spa/ /app/static/
CMD java -jar app.jar --spring.web.resources.static-locations=file:/app/static
