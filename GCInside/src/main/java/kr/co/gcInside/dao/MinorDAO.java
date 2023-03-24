package kr.co.gcInside.dao;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
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

    /**
     * 2023/03/21 // 김동민 // validation
     * @param gell_create_name
     * @return
     */
    public int countBygellname(String gell_create_name);
    /**
     * 2023/03/22 // 김동민 // validation
     * @param gell_create_address
     * @return
     */
    public int countBygelladdress(String gell_create_address);
    /**
     * 2023/03/23 // 김동민 // 흥한 갤러리 불러오기
     */
    public List<galleryVO>selecthotmgall();
    /**
     * 2023/03/24 // 김동민 // 신설 갤러리 불러오기
     */
    public List<galleryVO>selectnewmgall();

}