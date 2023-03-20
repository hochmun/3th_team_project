package kr.co.gcInside.dao;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MinorDAO {

    /**
     * 2023/03/16 // 김동민 // cate2 불러오기
     * @return
     */
    public List<CreateVO> selectcate2();
    /**
     * 2023/03/16 // 김동민 // 갤러리 생성
     */
    public void creategall(CreateVO frmCreate);
    /**
     * 2023/03/17 // 김동민 // 약관 불러오기
     */
    public List<TermsVO> selectminorterms();
}