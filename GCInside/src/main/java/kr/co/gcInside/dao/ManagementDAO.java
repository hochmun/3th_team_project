package kr.co.gcInside.dao;


import kr.co.gcInside.vo.Gell_SettingVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_manage_logVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 DAO
 */
@Mapper
@Repository
public interface ManagementDAO {
    public Map<String, Object> selectArticleAndSetting(@Param("gell_address") String gell_address);


    /**
     * 2023.04.03 // 라성준 //
     * 매니지먼트 설정 정보 업데이트
     * @param setting
     * @return
     */
    public int updateGellSetting(Gell_SettingVO setting);


    /**
     * 2023.04.03 // 라성준 //
     * 갤러리 이름 업데이트
     * @param vo
     * @return
     */
    public int updateGell(galleryVO vo);


    /**
     * 2023.04.14 // 라성준
     * 갤러리 설명 업데이트
     * @param vo
     * @return
     */
    public int updateGellInfo(galleryVO vo);


    /**
     * 2023.04.03 // 라성준 //
     * 이름이 같은 갤러리 개수 조회
     * @param gell_name
     * @return
     */
    public int equalsGell(@Param("gell_name") String gell_name);


    /**
     * 2023.04.13 // 라성준 // 갤러리 상태값 변경 로그 삽입
     * @param gell_manage_logVO
     * @return
     */
    public int insertGellManageLog(gell_manage_logVO gell_manage_logVO);


    /**
     * 2023.04.13 // 라성준 // 최근 7일간의 갤러리 로그 개수 조회
     * @param gell_num
     * @return
     */
    public int selectRecentGellManageLog(@Param("gell_num") int gell_num);
}


