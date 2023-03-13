package kr.co.gcInside.dao;

import kr.co.gcInside.vo.SingoVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 2023/03/13 // 라성준 //
 * singo DAO
 */

@Mapper
@Repository
public interface SingoDAO {

   public int insertSingo(SingoVO vo);

   public List<SingoVO> selectSingoList();
}
