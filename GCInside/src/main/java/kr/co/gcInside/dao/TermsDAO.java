package kr.co.gcInside.dao;

import kr.co.gcInside.vo.TermsVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Terms 약관 가져오기
 * @since 2023/03/08
 * @author 라성준
 *
 */

@Mapper
@Repository
public interface TermsDAO {

    public List<TermsVO> selectTerm(@Param("type") int type);
}
