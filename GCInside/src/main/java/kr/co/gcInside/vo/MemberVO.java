package kr.co.gcInside.vo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberVO {
    private String member_uid;
    private String member_pass;
    private String member_pass1;
    private String member_pass2;
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

}
