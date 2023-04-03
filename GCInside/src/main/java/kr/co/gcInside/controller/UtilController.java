package kr.co.gcInside.controller;

import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.utill.PagingUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 2023/04/03 // 심규영 // 도구 컨트롤러 생성
 */
@Controller
public class UtilController {

    /**
     * 2023/04/03 // 심규영 // 페이징 전용 페이지 / 동적 페이징 처리용
     *   들어오는 값
     *      pg    : 현제 페이지
     *      total : 페이징 할 데이터의 전체 갯수
     *      count : 페이징 할 데이터의 페이지 당 갯수
     * @return
     */
    @ResponseBody
    @PostMapping("utils/pagingPage")
    public Map<String, Object> PagingPage(@RequestBody Map<String, String> data) {
        Map<String, Object> resultMap = new HashMap<>();

        PagingDTO pagingDTO = new PagingUtil().getPagingDTO(data.get("pg"),Integer.parseInt(data.get("total")),data.get("count"));
        resultMap.put("pagingDTO", pagingDTO);

        return resultMap;
    }

}
