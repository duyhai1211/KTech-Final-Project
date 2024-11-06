package com.example.foodle.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

// JWT 자체와 관련된 기능을 만드는 곳
@Slf4j
@Component
public class JwtTokenUtils {
    private final Key signingKey;
    private final JwtParser jwtParser;
    private final Set<String> invalidatedTokens = new HashSet<>();
    public JwtTokenUtils(
            @Value("${jwt.secret}")
            String jwtSecret
    ) {
        this.signingKey
                = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.jwtParser = Jwts
                .parserBuilder()
                .setSigningKey(this.signingKey)
                .build();
    }
    public void invalidateToken(String token) {
        invalidatedTokens.add(token);
        log.info("Token has been invalidated: {}", token);
    }

    public String generateToken(UserDetails userDetails) {
        Instant now = Instant.now();
        Claims jwtClaims = Jwts.claims()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(60 * 60 * 24 * 7)));

        return Jwts.builder()
                .setClaims(jwtClaims)
                .signWith(this.signingKey)
                .compact();
    }

    // 정상적인 JWT인지를 판단하는 메서드
    public boolean validate(String token) {
        try {
            // Check if token has been invalidated
            if (invalidatedTokens.contains(token)) {
                log.warn("Token has been invalidated");
                return false;
            }

            // Parse and validate the JWT token
            jwtParser.parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.warn("Invalid JWT: {}", e.getMessage());
            return false;
        }
    }


    // 실제 데이터(Payload)를 반환하는 메서드
    public Claims parseClaims(String token) {
        return jwtParser
                .parseClaimsJws(token)
                .getBody();
    }
    public String getUsernameFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }


}
