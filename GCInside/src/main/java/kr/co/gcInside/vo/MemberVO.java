package kr.co.gcInside.vo;

import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class MemberVO {
    private String member_uid;
    private String member_pass;

    private String member_email;
    private String member_nick;
    private int member_point;
    private String member_regip;
    private int member_grade;
    private int member_status;
    private String member_rdate;
    private String member_wdate;
    private String member_sanctions_rdate;
    private String member_sanctions_wdate;
    private int member_sanctions_grade;

    /* 추가 */
    private String gc_pw;
    private String gc_pwc;
    private String user_nick;
    private String email1;
    private String email2;
    private String regip;
    private String member_pass1;

    private int member_count;
}
