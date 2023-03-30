package kr.co.gcInside.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.file.AccessDeniedException;

@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private SecurityUserService service;

	@Bean
	@Order(1) // @Order = SecurityFilterChain 실행순서 어노테이션
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
		.sessionManagement()
		.maximumSessions(1)
		.maxSessionsPreventsLogin(true) // 동시 로그인 차단 설정
		.expiredUrl("/index") // 세션이 만료되었을때 리디렉션할 주소
		.sessionRegistry(sessionRegistry());

		// 전체 접근 가능
		http.authorizeRequests().antMatchers("/index").permitAll();
		
		// 로그인(인증)된 사용자는 페이지 접근불가
		http.authorizeRequests().antMatchers("/member/login").anonymous();
		http.authorizeRequests().antMatchers("/member/register").anonymous();

		// 로그인된 사용자가 403(권한없는)페이지 접근시 handle()함수 url로 이동시킴 (리다이렉트)
		http.exceptionHandling().accessDeniedHandler(handle());

		//iframe 동일 도메인 접근 허용
		http.headers().frameOptions().sameOrigin();

		// /member/login 경로에 대한 로그인 설정
		http
		.formLogin()
		.loginPage("/member/login")
		.defaultSuccessUrl("/index")
		.failureUrl("/member/login?success=100")
		.usernameParameter("member_uid")
		.passwordParameter("member_pass");

		// 사이트 위변조 요청 방지
		http.csrf().disable();

		// 로그아웃 설정
		http.logout()
		.invalidateHttpSession(true) // 세션 삭제
		.logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
		.logoutSuccessUrl("/index") //로그아웃성공시 이동할 url
		.deleteCookies("JSESSIONID");

		http.userDetailsService(service);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	@Bean
	public ConcurrentSessionFilter concurrentSessionFilter() {
		return new ConcurrentSessionFilter(sessionRegistry(), event -> {
			HttpSession session = event.getRequest().getSession();
			// 세션이 만료될 때 로그아웃 처리를 수행합니다.
			SecurityContextHolder.clearContext();
		});
	}
	/**
	 * 2023-03-29 // 전인준
	 * 403 forbidden 페이지접근시 리다이렉트 메서드
	 * */
	@Bean
	public AccessDeniedHandler handle(){
		return (request,response,accessDeniedException) -> {
			response.sendRedirect("/GCInside/index");
		};
	}

}
