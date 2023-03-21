package kr.co.gcInside.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 페이징 처리 정보 저장 전송 객체
 * @since 2023/02/09 // 심규영 
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PagingDTO {
    private int groupStart; // 페이지 그룹 시작 값
    private int groupEnd; // 페이지 그룹 끝 값
    private int currentPage; // 현재 페이지 번호
    private int lastPage; // 마지막 페이지 번호
    private int start; // 페이지 시작 값
}
