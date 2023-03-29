package kr.co.gcInside.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/29 // 심규영 // 댓글 VO
 * <pre>     내부 객체
 *          comment_num
 *          comment_article_num
 *          comment_content
 *          comment_login_status
 *          comment_uid
 *          comment_nonmember_name
 *          comment_nonmember_password
 *          comment_regip
 *          comment_re_count
 *          comment_status
 *          comment_rdate
 *          comment_wdate
 *          comment_w_uid</pre>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gell_commentVO {
    private int comment_num;
    private int comment_article_num;
    private String comment_content;
    private int comment_login_status;
    private String comment_uid;
    private String comment_nonmember_name;
    private String comment_nonmember_password;
    private String comment_regip;
    private int comment_re_count;
    private int comment_status;
    private String comment_rdate;
    private String comment_wdate;
    private String comment_w_uid;
    
    // 추가 컬럼
    private String member_nick;
    /** 2023/03/29 // 심규영 // 댓글 및 대댓글 불러오기 */
    private int re_comment_num; // 대댓글 번호
    private int comment_type; //  댓글, 대댓글 구분용 {0:댓글,1:대댓글}

    // getter

    /**
     * 2023/03/29 // 심규영 // ip 중간 자르기
     * @return
     */
    public String getComment_regip_sub() {
        if(!comment_regip.equals("0:0:0:0:0:0:0:1")) {
            String a = comment_regip.substring(0, comment_regip.indexOf('.',4));
            return a;
        } else {
            return "0:0:0";
        }
    }

    /**
     * 2023/03/29 // 심규영 // uid 뒷자리 2개 숨기기
     * @return
     */
    public String getComment_uid_sub() {
        return (comment_uid != null) ? comment_uid.substring(0, comment_uid.length()-2)+"**" : null;
    }
}
