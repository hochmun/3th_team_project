package kr.co.gcInside.dao;

import kr.co.gcInside.vo.galleryVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * 2023/03/20 // 심규영 // 보드 dao 생성
 */
@Mapper
@Repository
public interface BoardDAO {
    // create
    // read

    /**
     * 2023/03/20 // 심규영 // 갤러리 정보 불러오기
     * @param gell_address
     * @return
     */
    public galleryVO selectGellInfo(@Param("gell_address") String gell_address);

    // upload
    // delete
}
