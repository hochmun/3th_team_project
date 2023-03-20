package kr.co.gcInside.service;
/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
import kr.co.gcInside.dao.MinorDAO;
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
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
}