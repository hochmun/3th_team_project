package kr.co.gcInside.service;

import kr.co.gcInside.dao.ManagementDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 서비스
 */
@Service
public class ManagementService {

    @Autowired
    private ManagementDAO dao;

    //read

    /**
     * 2023.03.28 // 라성준 // 매니지먼트 서비스
     * @param address
     * @return
     */
    public Map<String, Object> selectArticleAndSetting(String address) {
        return dao.selectArticleAndSetting(address);
    }

}
