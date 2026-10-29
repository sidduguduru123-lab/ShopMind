# =========================================================
# Synapse Omnichannel — Fullstack Production Dockerfile
# "Uses a neural metaphor to highlight data connectivity across channels."
# =========================================================

# Stage 1: Build the React 19 Frontend with modern neural styling
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot 3.3.4 Backend (Java 21)
FROM maven:3.9.6-eclipse-temurin-21-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B
COPY backend/src ./src
# Embed frontend assets directly into Spring Boot static web resources
COPY --from=frontend-builder /app/frontend/dist/ ./src/main/resources/static/
RUN mvn clean package -DskipTests

# Stage 3: Lightweight Production JRE 21 Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
RUN mkdir -p /app/data

# Render assigns dynamic port via $PORT
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
