FROM maven:3.8.5-openjdk-17 as build
WORKDIR /build
COPY . /build
CMD mvn package

FROM openjdk:17.0.2 as app
WORKDIR /app
COPY --from=build /build/target/*.jar /app/app.jar
CMD java -jar app.jar