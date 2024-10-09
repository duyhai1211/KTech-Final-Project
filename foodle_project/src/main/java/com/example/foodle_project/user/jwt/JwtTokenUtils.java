package com.example.foodle_project.user.jwt;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import lombok.Generated;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenUtils {
    @Generated
    private final Key signingKey;
    private final JwtParser jwtParser;

    public JwtTokenUtils(@Value("${jwt.secret}") String jwtSecret) {
        this.signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.jwtParser = Jwts.parserBuilder().setSigningKey(this.signingKey).build();
    }

    public String generateToken(UserDetails userDetails) {
        Instant now = Instant.now();
        Claims jwtClaims = Jwts.claims().setSubject(userDetails.getUsername()).setIssuedAt(Date.from(now)).setExpiration(Date.from(now.plusSeconds(604800L)));
        return Jwts.builder().setClaims(jwtClaims).signWith(this.signingKey).compact();
    }

    public boolean validate(String token) {
        try {
            this.jwtParser.parseClaimsJws(token);
            return true;
        } catch (Exception var3) {
            log.warn("invalid jwt");
            return false;
        }
    }

    public Claims parseClaims(String token) {
        return (Claims)this.jwtParser.parseClaimsJws(token).getBody();
    }
}
