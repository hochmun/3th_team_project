package kr.co.gcInside.security;

import kr.co.gcInside.entity.UserEntity;
import kr.co.gcInside.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserService implements UserDetailsService {

	@Autowired
	private UserRepo repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// 스프링 시큐리티 인증 동작방식은 아이디/패스워드를 한번에 조회하는 방식이 아닌
		// 아이디만 이용해서 사용자 정보를 로딩하고 나중에 패스워드를 검증하는 방식

		UserEntity user = repo.findById(username).get();
		
		// 유저 정보 확인
		if(user == null) {
			throw new UsernameNotFoundException(username);
		}
		
		// Security 기본 사용자 객체 생성
		UserDetails myUser = MyUserDetails.builder().user(user).build();


		return myUser;
	}

}
