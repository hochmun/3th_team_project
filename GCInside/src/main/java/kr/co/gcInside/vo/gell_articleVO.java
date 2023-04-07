package kr.co.gcInside.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/22 // 심규영 // 게시물 테이블 vo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class gell_articleVO {
    private int article_num;
    private int articlel_gell_num;
    private int article_login_status;
    private String article_uid;
    private String article_nonmember_uid;
    private String article_nonmember_pass;
    private int article_sub_cate;
    private String article_title;
    private String article_content;
    private int article_hit;
    private int article_comment_count;
    private int article_recommend_count;
    private int article_member_recommend_count; /* 2023/04/03 // 심규영 // 유저 추천 수 추가 */ 
    private int article_be_recommend;
    private int article_recommend_status;
    private String article_regip;
    private int article_file;
    private int article_status;
    private String article_rdate;
    private String article_wdate;
    private String article_w_uid;

    // 추가 필드
    private String member_nick;
    private String article_regip_sub;
    private int num; /** 2023/04/07 // 심규영 // 게시글 번호 입력 */

    // Getter

    /**
     * 2023/03/27 // 심규영 // 0:0:0:0:0:0:0:1 에러 수정
     * @return
     */
    public String getArticle_regip_sub() {
        if(!article_regip.equals("0:0:0:0:0:0:0:1")) {
            String a = article_regip.substring(0, article_regip.indexOf('.',4));
            return a;
        } else {
            return "0:0:0";
        }

    }
}
