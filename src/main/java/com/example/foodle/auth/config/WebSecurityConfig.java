package com.example.foodle.auth.config;

import com.example.foodle.auth.jwt.JwtTokenFilter;
import com.example.foodle.auth.jwt.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenUtils jwtTokenUtils;
    private final UserDetailsService manager;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    // Cho phép truy cập ẩn danh vào các endpoint đăng nhập và đăng ký
                    auth.requestMatchers("/users/login", "/users/signin", "/users/signup", "/users/signup-owner", "/search")
                            .permitAll();

                    // Các endpoint ViewController không cần xác thực
                    auth.requestMatchers("/users", "/users/login", "/users/signup", "/users/orders")
                            .permitAll();

                    // Cho phép truy cập công khai vào các file tĩnh trong thư mục /static/css, /static/js, và /static/images
                    auth.requestMatchers("/css/**", "/js/**", "/images/**").permitAll();

                    // Yêu cầu xác thực cho các endpoint này
                    auth.requestMatchers("/users/update", "/users/profile", "/users/get-user-info",
                                    "/reservation/create", "/reservation/user/**", "/users/review/**")
                            .authenticated();

                    // Chỉ cho phép ROLE_ADMIN vào các endpoint của admin
                    auth.requestMatchers("/admin", "/admin/**").hasRole("ADMIN");

                    // Chỉ cho phép ROLE_OWNER vào các endpoint của chủ nhà hàng
                    auth.requestMatchers("/restaurant/**", "/reservation/restaurant/**").hasRole("OWNER");

                    // Cho phép tất cả mọi người truy cập vào các endpoint này
                    auth.requestMatchers("/error", "/static/**", "/views/**", "/review/**", "/").permitAll();

                    // Tất cả các yêu cầu khác phải có ROLE_ACTIVE
                    auth.anyRequest().hasRole("ACTIVE");
                })
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtTokenFilter(jwtTokenUtils, manager), AuthorizationFilter.class);

        return http.build();
    }
}
