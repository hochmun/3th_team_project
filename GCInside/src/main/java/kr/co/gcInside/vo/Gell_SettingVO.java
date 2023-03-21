package kr.co.gcInside.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/20 // 심규영 // 갤러리 세팅 vo 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gell_SettingVO {
    /**
     * 설정 번호
     */
    private int setting_num;
    /**
     * 갤러리 번호
     */
    private int setting_gell_num;
    /**
     * 갤러리 멤버 설정
     * <p>
     * 0:사용 안함 <br>
     * 1:사용
     * </p>
     */
    private int setting_member;
    /**
     * 갤러리 익명 설정
     */
    private int setting_non_nick;
    /**
     * 갤러리 글목록 공개 설정 <br>
     * 0:전체 <br>
     * 1:고정닉 공개(회원) <br>
     * 2:전체 비공개
     */
    private int setting_article_open_s;
    /**
     * 추천글 기준 개수 <br> 단위 5 ~ 100
     */
    private int setting_recommend_standard;
    /** 비추천 허용 */
    private int setting_be_recommend;

    private int setting_be_recommend_standard;
    /**
     * 갤러리 말머리 개수
     * 0일 경우 비활성
     * 최대 15개
     */
    private int setting_sub_cate;
    private int setting_basic_cate;
    private int setting_p_word;
    private String setting_p_word_list;
    private int setting_auto_article_delete;
    private int setting_secret;
    private int setting_notice;
    private int setting_fix_s;
    private int setting_fix_num;
    private int setting_fix_time;
    private int setting_adult;
}
