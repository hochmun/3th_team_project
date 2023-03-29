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

    ;

    public List<Map<Integer, Integer>> rankdiff() {
        List<Map<Integer, Integer>> today = dao.todayrank();
        List<Map<Integer, Integer>> yesterday = dao.yesterdayrank();
        List<Map<Integer, Integer>> diffList = new ArrayList<>();
        log.info("today :",today.toString());
        log.info("yesterday :",yesterday.toString());
        for (Map<Integer, Integer> map1 : yesterday) {
            for (Map<Integer, Integer> map2 : today) {
                if (map1.keySet().equals(map2.keySet())) { // 키가 같은 경우
                    Map<Integer, Integer> diffMap = new HashMap<>(); // 차이 값을 저장할 맵
                    for (Integer key : map1.keySet()) {
                        int diff = map1.get(key) - map2.get(key); // 값의 차이 계산
                        diffMap.put(key, diff); // 차이 값을 맵에 추가
                    }
                    diffList.add(diffMap); // 차이 값을 저장하는 맵을 리스트에 추가
                    break;
                }
            }
        }
        log.info(diffList.toString());
        return diffList;
    }

    /**
     * 2023/03/29 // 김동민 // 어제,오늘 랭크 업데이트
     * initrank 0으로 rank초기화
     * resetrank sql rank 변수 초기화
     */

    public void updatehotmgallyesterdayrank(){
        dao.updatehotmgallyesterdayrank();
    };
    public void updatehotmgalltodayrank(){
        dao.updatehotmgalltodayrank();
    };
    public void initrank(){
      dao.initrank();
    };
    public void resetrank(){
        dao.resetrank();
    }

}