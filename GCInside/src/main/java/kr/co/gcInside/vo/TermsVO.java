package kr.co.gcInside.vo;

import lombok.*;

/**
 * TermsVO
 * @since 2023/03/08
 * @author 라성준
 *
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TermsVO {

    private int term_type;
    private String term_title;
    private int term_title_num;
    private String term_sub_title;
    private int term_sub_title_num;
    private String term_content;
}
