package kr.co.gcInside.security;

import kr.co.gcInside.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Builder
public class MyUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;

	private UserEntity user;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// 계정이 갖는 권한 목록
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_"+user.getMember_grade()));
		return authorities;
	}

	@Override
	public String getPassword() {
		// 계정이 갖는 비밀번호
		return user.getMember_pass();
	}

	@Override
	public String getUsername() {
		// 계정이 갖는 아이디
		return user.getMember_uid();
	}

	@Override
	public boolean isAccountNonExpired() {
		// 계정 만료 여부(True:만료안됨, False:만료)
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// 계정 잠김 여부(true:잠김안됨, false:잠김)
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// 비밀번호 만료 여부(true:만료안됨, false:만료)
		return true;
	}

	@Override
	public boolean isEnabled() {
		// 계정 활성화 여부(true:활성화, false:비활성화)
		return true;
	}

}
