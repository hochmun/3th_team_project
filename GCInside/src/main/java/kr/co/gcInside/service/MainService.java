package kr.co.gcInside.service;

import kr.co.gcInside.dao.MainDAO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class MainService {

    @Autowired
    private MainDAO dao;

    //read

    /**
     * 2023.03.22 // 라성준 // 메인 인덱스  메인  신설갤 서비스
     * @return
     */
    public List<galleryVO> MainIndexNewmCommunity (int start) {
        return dao.MainIndexNewCommunity(start);
    }

    /**
     * 2023.03.22 // 라성준 // 메인 인덱스  마이너  신설갤 서비스
     * @return
     */
    public List<galleryVO> MainIndexNewmgellCommunity (int start) {
        return dao.MainIndexNewMgellCommunity(start);
    }

    /**
     * 2023.03.23 // 라성준 // 메인 인덱스  미니 신설갤 서비스
     * @param start
     * @return
     */
    public List<galleryVO> MainIndexNewminiCommunity (int start) {
        return dao.MainIndexNewMiniCommunity(start);
    }

    /**
     * 2023.03.27 // 라성준 // 메인 인덱스 롤링갤러리 서비스
     * @return
     */
    public List<galleryVO> MainIndexRollingGall () {
        return dao.MainIndexRollingGall();
    }

    /**
     * 2023.04.24 // 라성준 // 메인 인덱스 인기갤러리 서비스
     * @return
     */
    public List<galleryVO> MainIdexPopularityGell () {
        return dao.MainIdexPopularityGell();
    }

    /**
     * 2023.03.24 // 라성준 // 마이너 갤러리 개수 가져오기
     * @return
     */
    public int MainIndexNewCommunityCount(Map<String, String> data) {
        return dao.MainIndexNewCommunityCount(data);
    }

    /**
     * 2023/04/17 // 심규영 // 전날 게시글 갯수 및 댓글 갯수 가져오는 기능
     * @return
     */
    public Map<String, Object> selectYesterdayCount(){
        return dao.selectYesterdayCount();
    }

    /**
     * 2023/04/19 // 심규영 // 실시간 게시물 불러오는 기능
     * @param pg
     * @return
     */
    public List<gell_articleVO> selectRealtimeGetArticleList(String pg) {
        int start = (Integer.parseInt(pg) - 1) * 25;
        return dao.selectRealtimeGetArticleList(start);
    }

    /**
     * 2023/04/21 // 심규영 // 실시간 북적이는 갤러리 불러오는 기능<br/>
     * 나열 방식 => 1: total 내림차순 DESC, 2: 이전 랭킹 올림차순 ASC
     * @param data {
     *             gall_type : 갤러리 타입 {g : 메인 , m: 마이너 , mi: 미니 }
     *             page : 페이지 번호
     * }
     * @return [{
     *     rank         : 랭킹
     *     preRank      : 이전 랭킹
     *     gell_name    : 갤러리 이름,
     *     gell_address : 갤러리 주소,
     *     total        : 1시간 내의 신규 게시글, 댓글, 대댓글 개수
     *     preTotal     : 1시간 전 부터 2시간 전 이후의 게시글, 댓글 , 대댓글 개수
     * }]
     */
    public List<Map<String, Object>> selectHotLiveArticles(Map<String, String> data){
        int gall_type = data.get("gall_type").equals("g") ? 0 : data.get("gall_type").equals("m") ? 1 : 2;
        int start = (Integer.parseInt(data.get("page")) - 1) * 10;

        return dao.selectHotLiveArticles(gall_type, start);
    }

    /**
     * 2023/04/07 // 김동민 // 개념글(임시로 추천수1이상 글) 출력
     */
    public List<gell_articleVO> selecthotarticle(){

        return dao.selecthotarticle();
    }
    /**
     * 2023/04/07 // 김동민 // 흥한갤러리 관련 minor에서 사용했던 코드 메인에 적용
     */
    public List<galleryVO> selecthotgall() {
        return dao.selecthotgall();
    } /* 흥한 갤러리 불러오기*/
    public List<galleryVO> selectnewgall() {
        return dao.selectnewgall();
    } /* 신설 갤러리 불러오기*/

    public List<galleryVO> rankdiff() {
        List<galleryVO> today = dao.mtodayrank();
        List<galleryVO> yesterday = dao.myesterdayrank();
        List<galleryVO> resultList = new ArrayList<>();

        if (yesterday.isEmpty()) {
            for (galleryVO to : today) {
                galleryVO gelldiff = new galleryVO();
                gelldiff.setGell_num(to.getGell_num());
                gelldiff.setGell_today_rank(to.getGell_today_rank());
                gelldiff.setGell_rank_diff(0);
                resultList.add(gelldiff);
            }
        } else {
            for (galleryVO to : today) {
                boolean found = false;
                for (galleryVO yes : yesterday) {
                    if (yes.getGell_num() == to.getGell_num()) {
                        int diff = yes.getGell_yesterday_rank() - to.getGell_today_rank();
                        galleryVO gelldiff = new galleryVO();
                        gelldiff.setGell_num(yes.getGell_num());
                        gelldiff.setGell_yesterday_rank(yes.getGell_yesterday_rank());
                        gelldiff.setGell_today_rank(to.getGell_today_rank());
                        gelldiff.setGell_rank_diff(diff);
                        resultList.add(gelldiff);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    galleryVO gelldiff = new galleryVO();
                    gelldiff.setGell_num(to.getGell_num());
                    gelldiff.setGell_today_rank(to.getGell_today_rank());
                    gelldiff.setGell_rank_diff(0);
                    resultList.add(gelldiff);
                }
            }
        }
        return resultList;
    }
    public void gallinit(){
        dao.initrank(); /* gc_gell 테이블 랭크 칼럼 초기화 */
        log.info("initrank");
        dao.todayarticlecount(); /* gc_gell_article에서 갤러리별 오늘 게시물 작성수 업데이트*/
        log.info("todayarticleupdate");
        dao.resetrank();/* 쿼리문 변수 rank 초기화 */
        log.info("resetrankyesday");
        dao.updatehotgallyesterdayrank(); /* 어제 게시글 개수 기준으로 어제랭킹 update */
        log.info("updateyesrank");
        dao.resetrank(); /* 쿼리문 변수 rank 초기화 */
        log.info("resetranktoday");
        dao.updatehotgalltodayrank(); /* 오늘 게시글 개수 기준으로 오늘 랭킹 update */
        log.info("updatetorank");

    } /* 불러오기 전 초기 작업 */
    /* 카테고리별 갤러리 개수 */
    public List<Integer> gallcate1cnt() {

        List<Integer> counts = new ArrayList<>();

        for (int cate = 1; cate <= 36; cate++) {
            if(dao.gallcate1cnt(cate) == '0'){
                int count = 0;
                counts.add(count);
            }else {
                int count = dao.gallcate1cnt(cate);
                counts.add(count);
            }


        }

        return counts;
    }

    /**
     * 2023/04/17 // 김동민 // 갤러리 불러오기
     * @return
     */
    public List<galleryVO> selectgall() {
        return dao.selectgall();
    }

    /**
     * 2023/04/18 // 전인준 // hit갤러리 가져오기
     */
    public List<gell_articleVO> hitgall(){
        return dao.hitgall();
    }

    /**
     * 2023/04/21 // 김재준 // 카테고리별 개념글 가져오기
     */
    public List<Map<String, Object>> selectHotArticlesByCategory(Map<String, String> data) {
        int cate = Integer.parseInt(data.get("cate"));

        return dao.selectHotArticlesByCategory(cate);
    }

}
