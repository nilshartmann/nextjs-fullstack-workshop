package nh.recipify.domain.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class PingController {
private static final Logger log = LoggerFactory.getLogger( PingController.class );
    @GetMapping("/api/ping/hello")
    String hello(@AuthenticationPrincipal Jwt auth, Principal principal) {
        log.info("/api/ping/hello called! Claims {} Principal {}", auth == null ? "no auth" : auth.getClaims(), principal == null ? "no principal" : principal.getName());
        var subject = auth != null ? auth.getSubject() : "";
        return "Hello " + subject + "!";
    }

    @GetMapping("/api/ping/money")
    String money(@AuthenticationPrincipal Jwt auth) {

        var subject = auth != null ? auth.getSubject() : "no auth";
        var expiresAt = auth != null ? auth.getExpiresAt() : "no auth";

        log.info("/api/ping/money called! Subject: '{}' expires: {}", subject, expiresAt);
        return "Money! Money! Money! Must be funny for " + subject;
    }
}
