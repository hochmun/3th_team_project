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

    // Getter
    public String getArticle_regip_sub() {
        String a = article_regip.substring(0, article_regip.indexOf('.',4));
        return a;
    }
}
