package com.example.foodle_project.user.model.jwt;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    @Generated
    private final JwtTokenUtils tokenUtils;
    private final UserDetailsService service;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            filterChain.doFilter(request, response);
        } else {
            String[] headerSplit = authHeader.split(" ");
            if (headerSplit.length == 2 && headerSplit[0].equals("Bearer")) {
                String jwt = headerSplit[1];
                if (!this.tokenUtils.validate(jwt)) {
                    filterChain.doFilter(request, response);
                } else {
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    String username = this.tokenUtils.parseClaims(jwt).getSubject();
                    UserDetails userDetails = this.service.loadUserByUsername(username);
                    AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
                    context.setAuthentication(authentication);
                    SecurityContextHolder.setContext(context);
                    filterChain.doFilter(request, response);
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }


}
