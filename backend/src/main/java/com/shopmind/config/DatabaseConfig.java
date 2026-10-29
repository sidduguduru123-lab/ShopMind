package com.shopmind.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url:}")
    private String configuredUrl;

    @Value("${spring.datasource.username:sa}")
    private String configuredUsername;

    @Value("${spring.datasource.password:}")
    private String configuredPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl == null || dbUrl.isBlank()) {
            dbUrl = System.getenv("SPRING_DATASOURCE_URL");
        }
        if (dbUrl == null || dbUrl.isBlank()) {
            dbUrl = configuredUrl;
        }

        HikariConfig config = new HikariConfig();

        // Support Render / Heroku postgresql:// or postgres:// URI format
        if (dbUrl != null && (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://"))) {
            try {
                URI uri = new URI(dbUrl);
                String userInfo = uri.getUserInfo();
                String username = configuredUsername;
                String password = configuredPassword;
                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    username = parts[0];
                    password = parts[1];
                }
                int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();

                config.setJdbcUrl(jdbcUrl);
                config.setUsername(username);
                config.setPassword(password);
                config.setDriverClassName("org.postgresql.Driver");
            } catch (Exception e) {
                config.setJdbcUrl("jdbc:" + dbUrl);
                config.setDriverClassName("org.postgresql.Driver");
            }
        } else if (dbUrl != null && dbUrl.startsWith("jdbc:postgresql:")) {
            config.setJdbcUrl(dbUrl);
            config.setUsername(configuredUsername);
            config.setPassword(configuredPassword);
            config.setDriverClassName("org.postgresql.Driver");
        } else if (dbUrl != null && dbUrl.startsWith("jdbc:mysql:")) {
            config.setJdbcUrl(dbUrl);
            config.setUsername(configuredUsername);
            config.setPassword(configuredPassword);
            config.setDriverClassName("com.mysql.cj.jdbc.Driver");
        } else {
            // Default H2 embedded database
            config.setJdbcUrl(dbUrl != null && !dbUrl.isBlank() ? dbUrl : "jdbc:h2:file:./data/shopmind_db;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE");
            config.setUsername(configuredUsername);
            config.setPassword(configuredPassword);
            config.setDriverClassName("org.h2.Driver");
        }

        config.setMaximumPoolSize(10);
        return new HikariDataSource(config);
    }
}
