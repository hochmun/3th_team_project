package kr.co.gcInside.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/04/13 // 심규영 // fileVO 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Gell_fileVO {
    private int file_num;
    private int file_article_num;
    private String file_ori_name;
    private String file_new_name;
    private String file_rdate;
    private String file_url;
}
