package nh.recipify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Profile("!security")
public class NoSecurityConfig {

    private static final Logger log = LoggerFactory.getLogger( NoSecurityConfig.class );

    @Bean
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        log.info("NO SECURITY - PERMIT ALL REQUESTS");
        http.authorizeHttpRequests(c -> c.anyRequest().permitAll());
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

}