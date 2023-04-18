package kr.co.gcInside.dao;

import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
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

    /**
     * 2023/04/07 // 김동민 // 개념글(임시로 추천수1이상 글) 출력
     */
    public List<gell_articleVO> selecthotarticle();

    /**
     * 2023/04/17 // 심규영 // 전날 게시글 갯수 및 댓글 갯수 가져오는 기능
     * @return
     */
    public Map<String, Object> selectYesterdayCount();

    public List<gell_articleVO> selectRealtimeGetArticleList(Map<String,String> data);


    /**
     * 2023/04/07 // 김동민 // 흥한갤러리 관련 minor에서 사용했던 코드 메인에 적용
     */
    public List<galleryVO>selecthotgall();      // 흥한 갤러리 불러오기
    public List<galleryVO>selectnewgall();     // 갤러리 신설 갤러리 불러오기
    public List<galleryVO> mtodayrank();        // 오늘 갤러리 랭크 가져오기
    public List<galleryVO> myesterdayrank();    // 어제 갤러리 랭크 가져오기
    public void updatehotgallyesterdayrank();   // 어제 갤러리 랭크 업데이트
    public void updatehotgalltodayrank();       // 오늘 갤러리 랭크 업데이트
    public void initrank();                     // rank칼럼 초기화
    public void resetrank();                    // sql rank초기화
    public void todayarticlecount();            // 랭킹확인용 오늘의 게시글 개수

    /**
     * 2023/04/17 // 김동민 // 갤러리 불러오기
     */
    public List<galleryVO>selectgall();
    /**
     * 2023/04/17 // 김동민 // 갤러리 수 불러오기
     * for문에서 cate 값을 갤러리 수만큼 늘리면 된다
     */
    public int gallcate1cnt(int cate);

    /**
     * 2023/04/18 // 전인준 // hit갤러리 가져오기
     */

    public List<gell_articleVO> hitgall();
}
