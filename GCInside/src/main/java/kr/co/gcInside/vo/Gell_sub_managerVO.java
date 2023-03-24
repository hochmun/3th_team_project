package kr.co.gcInside.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/24 // 심규영 // 갤러리 부 매니저 VO 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gell_sub_managerVO {
    private int sub_manager_num;
    private int sub_manager_gell_num;
    private String sub_manager_uid;
    private int sub_manager_grade;
    private String sub_manager_rdate;

    // 추가 필드
    /** 2023/03/24 // 심규영 // 유저 닉네임 필드 추가 */
    private String member_nick;

}
