package kr.co.gcInside.vo;

import lombok.*;

/**
 * 2023.04.12 // 라성준 // 매니져 기록 VO
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class gell_manage_logVO {
    private int gell_m_l_n;
    private int gell_m_l_g_n;
    private String gell_m_l_uid;
    private String gell_m_l_cate;
    private String gell_m_l_content;
    private String gell_m_l_data;
}
