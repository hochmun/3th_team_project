package kr.co.gcInside.service;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
import kr.co.gcInside.dao.MinorDAO;
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.galleryVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class MinorService {
    @Autowired
    private MinorDAO dao;

    /**
     * 2023/03/16 // 김동민 // cate2 불러오기
     *
     * @return
     */
    public List<CreateVO> selectcate2() {
        return dao.selectcate2();
    }

    /**
     * 2023/03/16 // 김동민 // 갤러리 생성
     */
    public void creategall(CreateVO frmCreate) {
        dao.creategall(frmCreate);

    }

    public List<TermsVO> selectminorterms() {
        return dao.selectminorterms();
    }

    /**
     * 2023/03/21 // 김동민 // validation
     *
     * @param gell_create_name
     * @return
     */
    public boolean isdupli(String gell_create_name) {
        int count = dao.countBygellname(gell_create_name);
        return count > 0;
    }

    /**
     * 2023/03/22 // 김동민 // validation
     *
     * @param gell_create_address
     * @return
     */
    public boolean isdupliad(String gell_create_address) {
        int count = dao.countBygelladdress(gell_create_address);
        return count > 0;
    }

    /**
     * 2023/03/23 // 김동민 // 흥한 갤러리 불러오기
     */
    public List<galleryVO> selecthotmgall() {

        return dao.selecthotmgall();
    }

    ;

    /**
     * 2023/03/24 // 김동민 // 신설 갤러리 불러오기
     */
    public List<galleryVO> selectnewmgall() {
        return dao.selectnewmgall();
    }

    /**
     * 2023/03/27 // 김동민 // 마이너 갤러리 불러오기
     */
    public List<galleryVO> selectminorgall() {
        return dao.selectminorgall();
    }

    public List<Integer> mgallcate1cnt() {

        List<Integer> counts = new ArrayList<>();

        for (int cate = 1; cate <= 2; cate++) {
            int count = dao.mgallcate1cnt(cate);
            counts.add(count);
        }

        return counts;
    }

    /**
     * 2023/03/30 // 김동민 // rank 차 구하기
     * 2023/04/10 // 김동민 // rank 차 어제 랭크 없을 때 랭크 0 으로 출력
     * @return
     */
        public List<galleryVO> rankdiff() {
            List<galleryVO> today = dao.mgalltodayrank();
            List<galleryVO> yesterday = dao.mgallyesterdayrank();
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

    /**
     * 2023/03/29 // 김동민 // 어제,오늘 랭크 업데이트
     * initrank 0으로 rank초기화
     * resetrank sql rank 변수 초기화
     * 2023/03/30 // 김동민 // 갤러리별 오늘 게시물 작성수 업데이트
     * 2023/03/30 // 김동민 // 서비스 한번만 들리게 하기
     */
    public void minorinit(){
        dao.initrank(); /* gc_gell 테이블 랭크 칼럼 초기화 */
        log.info("initrank");
        dao.todayarticlecount(); /* gc_gell_article에서 갤러리별 오늘 게시물 작성수 업데이트*/
        log.info("todayarticleupdate");
        dao.resetrank();/* 쿼리문 변수 rank 초기화 */
        log.info("resetrankyesday");
        dao.updatehotmgallyesterdayrank(); /* 어제 게시글 개수 기준으로 어제랭킹 update */
        log.info("updateyesrank");
        dao.resetrank(); /* 쿼리문 변수 rank 초기화 */
        log.info("resetranktoday");
        dao.updatehotmgalltodayrank(); /* 오늘 게시글 개수 기준으로 오늘 랭킹 update */
        log.info("updatetorank");

    }

}