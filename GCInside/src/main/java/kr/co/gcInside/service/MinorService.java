package kr.co.gcInside.service;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
import kr.co.gcInside.dao.MinorDAO;
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class MinorService {
    @Autowired
    private MinorDAO dao;
    /**
     * 2023/03/16 // 김동민 // cate2 불러오기
     * @return
     */
    public List<CreateVO> selectcate2() {
        return dao.selectcate2();
    }

    /**
     * 2023/03/16 // 김동민 // 갤러리 생성
     */
    public void creategall(CreateVO frmCreate){
        dao.creategall(frmCreate);

    }
    public List<TermsVO> selectminorterms(){
        return dao.selectminorterms();
    }

    /**
     * 2023/03/21 // 김동민 // validation
     * @param gell_create_name
     * @return
     */
    public boolean isdupli(String gell_create_name){
        int count = dao.countBygellname(gell_create_name);
        return count > 0;
    }
    /**
     * 2023/03/22 // 김동민 // validation
     * @param gell_create_address
     * @return
     */
    public boolean isdupliad(String gell_create_address){
        int count = dao.countBygelladdress(gell_create_address);
        return count > 0;
    }
    /**
     * 2023/03/23 // 김동민 // 흥한 갤러리 불러오기
     */
    public List<galleryVO>selecthotmgall(){

        return dao.selecthotmgall();
    };
    /**
     * 2023/03/24 // 김동민 // 신설 갤러리 불러오기
     */
    public List<galleryVO>selectnewmgall(){
        return dao.selectnewmgall();
    }
}