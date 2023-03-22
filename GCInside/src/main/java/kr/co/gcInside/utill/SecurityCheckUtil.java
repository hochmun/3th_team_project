package kr.co.gcInside.utill;

import kr.co.gcInside.dto.SecurityInfoDTO;
import kr.co.gcInside.security.MyUserDetails;

/**
 * 2023/03/21 // 심규영 //
 * 유저 확인용 도구
 */
public class SecurityCheckUtil {

    /**
     * 2023/03/21 // 심규영 // DTO로 받기
     * @param myUserDetails
     * @return
     */
    public SecurityInfoDTO getSecurityInfoDTO(MyUserDetails myUserDetails) {
        return new SecurityInfoDTO().builder()
                .isAnonymous(isAnonymous(myUserDetails))
                .isAuthenticated(isAuthenticated(myUserDetails))
                .build();
    }


    /**
     * 2023/03/21 // 심규영 // 비회원 회원 체크
     * @param myUserDetails
     * @return
     */
    public boolean isAnonymous(MyUserDetails myUserDetails) {
        if(myUserDetails == null) return true;
        else return false;
    }

    /**
     * 2023/03/22 // 심규영 // 로그인 체크
     * @param myUserDetails
     * @return
     */
    public boolean isAuthenticated(MyUserDetails myUserDetails) {
        if(myUserDetails != null) return true;
        else return false;
    }

}
