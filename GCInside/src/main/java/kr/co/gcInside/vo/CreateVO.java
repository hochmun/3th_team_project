package kr.co.gcInside.vo;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 관련 VO
 */

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Builder
public class CreateVO {
    private String gell_create_rdate;
    private int gell_create_status;
    private String gell_create_uid;
    private String gell_create_name;
    private String gell_create_intro;
    private int gell_create_cate;
    private String gell_create_address;
    private String gell_create_reason;
    private String gell_create_r_reason;
    private int gell_cate1;
    private int gell_cate2;
    private String gell_cate2_name;

    // 추가 필드
    private int gell_cate;
    private String gell_manager;
    private String gell_name;
    private String gell_address;
    private String gell_info;
    private int gell_grade;
    private int gell_status;
    private String gell_rdate;
}