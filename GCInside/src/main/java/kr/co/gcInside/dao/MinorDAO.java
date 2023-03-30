package kr.co.gcInside.dao;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.galleryVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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

    /**
     * 2023/03/27 // 김동민 // 마이너 갤러리 불러오기
     */
    public List<galleryVO>selectminorgall();
    /**
     * 2023/03/27 // 김동민 // 갤러리 수 불러오기
     * for문에서 cate 값을 갤러리 수만큼 늘리면 된다
     */
    public int mgallcate1cnt(int cate);

    /**
     * 2023/03/28 // 김동민 // 랭크차 구하기
     * @return
     */
    public List<galleryVO> todayrank();
    public List<galleryVO> yesterdayrank();
    /**
     * 2023/03/29 // 김동민 // 어제,오늘 랭크 업데이트
     */

    public void updatehotmgallyesterdayrank();
    public void updatehotmgalltodayrank();

    /**
     * 2023/03/29 // 김동민 // 랭크 업데이트 전 테이블 칼럼 초기화, RANK변수 초기화
     */
    public void initrank();
    public void resetrank();
    /**
     * 2023/03/30 // 김동민 // 갤러리별 오늘 게시물 작성수 업데이트
     */
    public void todayarticlecount();
}