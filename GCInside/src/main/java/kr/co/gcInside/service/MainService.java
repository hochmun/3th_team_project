package kr.co.gcInside.service;

import kr.co.gcInside.dao.MainDAO;
import kr.co.gcInside.vo.galleryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {

    @Autowired
    private MainDAO dao;

    //read

    /**
     * 2023.03.22 // 라성준 // 메인 인덱스 신설갤 서비스
     * @return
     */
    public List<galleryVO> MainIndexNewCommunity (int start) {
        return dao.MainIndexNewCommunity(start);
    }

    /**
     * 2023.03.22 // 라성준 // 메인 인덱스 신설갤 서비스
     * @return
     */
    public List<galleryVO> MainIndexNewMgellCommunity (int start) {
        return dao.MainIndexNewMgellCommunity(start);
    }

    /**
     *  마이너 갤러리 개수 가져오기
     * @return
     */
    public int MainIndexNewMgellCommunityCount() {
        return dao.MainIndexNewMgellCommunityCount();
    }

}
