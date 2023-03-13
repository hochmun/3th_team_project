package kr.co.gcInside.service;


import kr.co.gcInside.dao.SingoDAO;
import kr.co.gcInside.vo.SingoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 2023/03/13 // 라성준 //
 * singo service
 */

@Service
public class SingoService {

    @Autowired
    private SingoDAO singoDAO;

    public int inertSingo(SingoVO vo) {

        return singoDAO.insertSingo(vo);
    }
}






