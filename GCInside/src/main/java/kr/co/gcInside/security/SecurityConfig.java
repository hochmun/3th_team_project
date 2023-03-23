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
import org.springframework.security.web.session.ConcurrentSessionFilter;

import javax.servlet.http.HttpSession;

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
