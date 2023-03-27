package kr.co.gcInside.dao;

import kr.co.gcInside.vo.galleryVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 2023/03/10 // 심규영 // 메인 DAO 생성
 */
@Mapper
@Repository
public interface MainDAO {

    /**
     * 2023.03.22 // 라성준 // 메인인덱스 신설 메인 갤러리 DAO
     * @return
     */
    public List<galleryVO> MainIndexNewCommunity(@Param("start") int start);


    /**
     * 2023.03.22 // 라성준 // 메인인덱스 신설 마이너 갤러리 DAO
     * @return
     */
    public List<galleryVO> MainIndexNewMgellCommunity(@Param("start") int start);

    /**
     * 2023.03.23 // 라성준 // 메인인덱스 신설 미니 갤러리 DAO
     * @param start
     * @return
     */
    public List<galleryVO> MainIndexNewMiniCommunity(@Param("start") int start);

    /**
     * 2023.03.27 // 라성준 // 메인인덱스 롤링갤러리 DAO
     * @return
     */
    public List<galleryVO> MainIndexRollingGall();

    /**
     *  2023.03.22 // 라성준 // 
     *  페이징
     *  마이너 갤러리 개수 가져오기
     * @return
     */
    public int MainIndexNewCommunityCount(Map<String, String> data);


}
