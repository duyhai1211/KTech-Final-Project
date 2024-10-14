package com.example.foodle_project.base;

import com.example.foodle_project.user.model.UserService;
import com.example.foodle_project.user.model.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequiredArgsConstructor
@RequestScope
public class Rq {
    private final UserService userService;
    private final HttpServletRequest req;
    private final HttpServletResponse resp;
    private final HttpSession session;
    private User user = null;


    // 로그인 되어 있는 지 체크
    public boolean isLogin() {
        return user != null;
    }

    // 로그아웃 되어 있는체크
    public boolean isLogout() {
        return  !isLogin();
    }

    // 로그인 된 회원의 겍체
    public  User getUser() {
        if (isLogout() ) return null;

        // 데이터 없는지 확인
        if( user == null) {
            user = userService.findByUsername(user.getUsername()).orElseThrow();
        }

        return user;
    }

    public String historyBack(String msg) {
        req.setAttribute("alertMsg", msg);
        return "common/join";
    }
    public String currentPageUrl(){
        return req.getRequestURI();
    }

}
