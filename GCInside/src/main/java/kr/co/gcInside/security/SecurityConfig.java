package kr.co.gcInside.security;

import org.apache.coyote.Request;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Controller;
import org.thymeleaf.extras.springsecurity5.dialect.SpringSecurityDialect;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private SecurityUserService service;

	/**
	 * 2023/03/18 // 심규영 // iframe 동일 도메인 접근 허용
	 * @param http
	 * @return
	 * @throws Exception
	 */
	/*@Bean 회원가입시 인증메일 에러로임시 비활성화 */
	@Order(3)
	SecurityFilterChain iframeOptionFilter(HttpSecurity http) throws Exception {
		http.headers().frameOptions().sameOrigin();

		return http.build();
	}

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


		// /member/login 경로에 대한 로그인 설정
		http.requestMatchers()
		.antMatchers("/member/login")
		.and()
		.authorizeRequests()
		.antMatchers("/member/login").anonymous() // 인증(로그인)되지않은 사용자만 허용
		.and()
		.formLogin()
		.loginPage("/member/login")
		.defaultSuccessUrl("/index")
		.failureUrl("/member/login?success=100")
		.usernameParameter("member_uid")
		.passwordParameter("member_pass");

		// 사이트 위변조 요청 방지
		http.csrf().disable();

		http.userDetailsService(service);
		return http.build();
	}

	@Bean
	@Order(2)
	SecurityFilterChain indexfilterChain(HttpSecurity http) throws Exception {
		http
		.sessionManagement()
		.maximumSessions(1)
		.maxSessionsPreventsLogin(true) // 동시 로그인 차단 설정
		.expiredUrl("/index") // 세션이 만료되었을때 리디렉션할 주소
		.sessionRegistry(sessionRegistry());

		// 전체 접근 가능
		http.authorizeRequests().antMatchers("/index").permitAll();

		// /index 경로에 대한 로그인 설정
		http.requestMatchers()
		.antMatchers("/index")
		.and()
		.authorizeRequests()
		.antMatchers("/index").permitAll()
		.and()
		.formLogin()
		.loginPage("/index")
		.defaultSuccessUrl("/index")
		.failureUrl("/index?success=100")
		.usernameParameter("member_uid")
		.passwordParameter("member_pass");

		// 사이트 위변조 요청 방지
		http.csrf().disable();

		// 로그아웃 설정
		/* 기존 방식.invalidateHttpSession,.logoutRequestMatcher(New AntPath...)
		이 되지않아서 멤버컨트롤러에서 임시해결 */
		http.logout()
		.logoutUrl("/logout");

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
}
