package kr.co.gcInside.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/29 // 심규영 // 대댓글 VO 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gell_re_commentVO {
    private int re_comment_num;
    private int re_comment_oir_num;
    private int re_comment_article_num;
    private String re_comment_content;
    private int re_comment_login_status;
    private String re_comment_uid;
    private String re_comment_nonmember_name;
    private String re_comment_nonmember_password;
    private String re_comment_regip;
    private int re_comment_status;
    private String re_comment_rdate;
    private String re_comment_wdate;
    private String re_comment_w_uid;
    
    // 추가 컬럼
    private String member_nick;

    // getter

    /**
     * 2023/04/02 // 심규영 // regip 잘라서 리턴
     * @return
     */
    public String getRe_comment_regip_sub() {
        if(!re_comment_regip.equals("0:0:0:0:0:0:0:1")) {
            String a = re_comment_regip.substring(0, re_comment_regip.indexOf('.',4));
            return a;
        } else {
            return "0:0:0";
        }
    }
}
