package kr.co.gcInside.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 2023/03/21 // 심규영 // 시큐리티 정보 처리 DTO
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SecurityInfoDTO {
    private boolean isAnonymous;
}
