package kr.co.gcInside.vo;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 관련 VO
 */

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Data
public class CreateVO {
    private int gell_create_num;
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

    // 추가 get, set
    // gell_create_num int => string 변환
    public int getGell_create_num() {
        return gell_create_num;
    }
    public void setGell_create_num(String gell_create_num) {
        this.gell_create_num = Integer.parseInt(gell_create_num);
    }

    // gell_create_cate int => string 변환
    public int getGell_create_cate() {
        return gell_create_cate;
    }
    public void setGell_create_cate(String gell_create_cate) {
        this.gell_create_cate = Integer.parseInt(gell_create_cate);
    }
}