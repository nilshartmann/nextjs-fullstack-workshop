package nh.recipify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true)
@Profile("security")
class SecurityConfig {

    private static final Logger log = LoggerFactory.getLogger( SecurityConfig.class );

    @Bean
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.NEVER))
            .authorizeHttpRequests(auth -> {
                log.info("👮‍SECURITY ENABLED!");
                auth.requestMatchers("/api/ping/money").authenticated();
                auth.requestMatchers(HttpMethod.GET).permitAll();
                auth.anyRequest().authenticated();
            })
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
        ;

        // todo:
        //   - we access the api only from "backend for frontend",
        //     so we do not have a CSRF-Token
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

//    @Bean
//    JwtDecoder jwtDecoder() {
//        return NimbusJwtDecoder.
//            withIssuerLocation("http://localhost:21081/realms/hello-auth-realm")
//            .build();
//    }

//    @Bean
//    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
//        return new SecurityEvaluationContextExtension();
//    }
}