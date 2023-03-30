package kr.co.gcInside.dao;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 DAO
 */
@Mapper
@Repository
public interface ManagementDAO {
    public Map<String, Object> selectArticleAndSetting(@Param("gell_address") String gell_address);


}
