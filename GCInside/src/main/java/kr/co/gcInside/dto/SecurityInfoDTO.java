package kr.co.gcInside.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/21 // 심규영 // 시큐리티 정보 처리 DTO
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SecurityInfoDTO {
    /** 권한 없는 익명 사용자 */
    private boolean isAnonymous;
    /** 권한 관계없이 로그인 인증을 받은 경우 */
    private boolean isAuthenticated;
    /** 권한 관계없이 인증을 받았고 자동 로그인 비활성화 */
    private boolean isFullyAuthenticated;
    /** 자동 로그인을 사용하는 경우 */
    private boolean isRememberMe;
    /** 가지고 있는 현재 권한 */
    private String hasRole;
}
