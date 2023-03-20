package kr.co.gcInside.vo;

import lombok.*;

/**
 * 2023/03/16 // 김재준 // 갤러리 vo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class galleryVO {
    private int gell_num;
    private int gell_cate;
    private String gell_name;
    private String gell_address;
    private String gell_main_img;
    private String gell_info;
    private String gell_manager;
    private int gell_grade;
    private int gell_status;
    private int gell_hit;
    private int gell_article_count;
    private String gell_rdate;
    private String gell_wdate;
    private String gell_sanctions_rdate;
    private String gell_sancitons_wdate;
    private int gell_sanctions_grade;

    // 추가필드
    private int gell_cate2;
    private String gell_cate2_name;
    
    // 추가 필드 vo 연결
    private Gell_SettingVO gellSettingVO;

    // 추가 get, set
    // gell_num int -> String 변환
    public int getGell_num() {
        return gell_num;
    }
    public void setGell_num(String gell_num) {
        this.gell_num = Integer.parseInt(gell_num);
    }

    // gell_cate int -> String 변환
    public int getGell_cate() {
        return gell_cate;
    }
    public void setGell_cate(String gell_cate) {
        this.gell_cate = Integer.parseInt(gell_cate);
    }

    // gell_cate2 int -> String 변환
    public int getGell_cate2() {
        return gell_cate2;
    }
    public void setGell_cate2(String gell_cate2) {
        this.gell_cate2 = Integer.parseInt(gell_cate2);
    }
}
