package kr.co.gcInside.dao;


import kr.co.gcInside.vo.Gell_SettingVO;
import kr.co.gcInside.vo.galleryVO;
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
    public int updateGell(galleryVO vo);
    public  int equalsGell(galleryVO galleryVO);

}


