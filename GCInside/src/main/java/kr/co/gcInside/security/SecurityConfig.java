package kr.co.gcInside.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private SecurityUserService service;
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
		.sessionManagement()
		.maximumSessions(1)
		.maxSessionsPreventsLogin(true) // 동시 로그인 차단 설정
		.expiredUrl("/index") // 세션이 만료되었을때 리디렉션할 주소
		.sessionRegistry(sessionRegistry());

		// 인가(접근권한) 설정
		// 전체 접근 가능
		http.authorizeHttpRequests().antMatchers("/").permitAll();

		// 사이트 위변조 요청 방지
		http.csrf().disable();

		// 로그인 페이지 설정
		http.formLogin()
		.loginPage("/member/login")
		.defaultSuccessUrl("/index")
		.failureUrl("/member/login?success=100")
		.usernameParameter("member_uid")
		.passwordParameter("member_pass");

		// 로그아웃 설정
		http.logout()
		.invalidateHttpSession(true)
		.logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
		.logoutSuccessUrl("/member/login?success=200")
		.deleteCookies("JSESSIONID");

		http.userDetailsService(service);
		return http.build();
	}
	@Bean
	SecurityFilterChain indexfilterChain(HttpSecurity http) throws Exception {
		http
				.sessionManagement()
				.maximumSessions(1)
				.maxSessionsPreventsLogin(true) // 동시 로그인 차단 설정
				.expiredUrl("/index") // 세션이 만료되었을때 리디렉션할 주소
				.sessionRegistry(sessionRegistry());

		// 인가(접근권한) 설정
		// 전체 접근 가능
		http.authorizeHttpRequests().antMatchers("/").permitAll();

		// 사이트 위변조 요청 방지
		http.csrf().disable();

		// 로그인 페이지 설정
		http.formLogin()
				.loginPage("/member/login")
				.defaultSuccessUrl("/index")
				.failureUrl("/member/login?success=100")
				.usernameParameter("member_uid")
				.passwordParameter("member_pass");

		// 로그아웃 설정
		http.logout()
				.invalidateHttpSession(true)
				.logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
				.logoutSuccessUrl("/member/login?success=200")
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
}
