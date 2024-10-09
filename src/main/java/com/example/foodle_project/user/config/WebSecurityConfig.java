package com.example.foodle_project.user.config;

import com.example.foodle_project.user.jwt.CustomOAuth2UserService;
import com.example.foodle_project.user.jwt.JwtTokenFilter;
import com.example.foodle_project.user.jwt.JwtTokenUtils;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

@Configuration
public class WebSecurityConfig {
    private final JwtTokenUtils jwtTokenUtils;
    private final UserDetailsService manager;
    private final CustomOAuth2UserService oAuth2UserService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth) -> {
                    auth.requestMatchers(
                            "/users/loginForm",
                            "/users/joinForm",
                            "/users/join",
                            "/users/test/login",
                            "/users/test/oauth/login")
                            .permitAll();
                    auth.requestMatchers("/users/edit/**")
                            .hasRole("USER");
                    auth.requestMatchers("/manager/**")
                            .hasAnyAuthority(
                                    "ROLE_ADMIN", "ROLE_OWNER");
                    auth.requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN");
                    auth.anyRequest().authenticated();

        })
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )

                .addFilterBefore(
                        new JwtTokenFilter(
                                jwtTokenUtils,
                                manager
                        ),
                        AuthorizationFilter.class
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/users/loginForm")
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                        .defaultSuccessUrl("/user", true))
                .formLogin(form -> form
                        .loginPage("/users/loginForm")
                        .loginProcessingUrl("/users/login")
                        .defaultSuccessUrl("/user", true)
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/users/logout")
                        .logoutSuccessUrl("/users/loginForm")
                        .permitAll());
        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(this.manager);
        return authenticationManagerBuilder.build();
    }

    @Generated
    public WebSecurityConfig(final JwtTokenUtils jwtTokenUtils, final UserDetailsService manager, final CustomOAuth2UserService oAuth2UserService) {
        this.jwtTokenUtils = jwtTokenUtils;
        this.manager = manager;
        this.oAuth2UserService = oAuth2UserService;
    }
}

