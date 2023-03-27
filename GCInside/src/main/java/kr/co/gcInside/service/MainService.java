package kr.co.gcInside.service;

import kr.co.gcInside.dao.MainDAO;
import kr.co.gcInside.vo.galleryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
     * 2023.03.24 // 라성준 // 마이너 갤러리 개수 가져오기
     * @return
     */
    public int MainIndexNewCommunityCount(Map<String, String> data) {
        return dao.MainIndexNewCommunityCount(data);
    }

}
