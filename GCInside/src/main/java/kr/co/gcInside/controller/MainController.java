package kr.co.gcInside.controller;

import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.MainService;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.utill.SecurityCheckUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import kr.co.gcInside.vo.galleryVO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023/03/08 // 심규영 // 메인 컨트롤러 생성
 */
@Slf4j
@Controller
public class MainController {

    @Autowired
    private MainService service;

    /**
     * 2023.03.22 // 라성준 // 메인 신설갤 불러오기
     */
    @GetMapping(value = {"/", "index"})
    public String index(Model model, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        Map<String, String> data = new HashMap<>();
        data.put("grade", "mgall");

        // 신설 마이너 갤러리 페이징
        PagingDTO newgellPagingDTO = new PagingUtil().getPagingDTO(null, service.MainIndexNewCommunityCount(data));

        // 페이징 처리
        List<galleryVO> newMgellCommunityList = service.MainIndexNewmgellCommunity(newgellPagingDTO.getStart());

        model.addAttribute("newMgellCommunityList", newMgellCommunityList);
        model.addAttribute("newgellPagingDTO", newgellPagingDTO);
        model.addAttribute("authorize", new SecurityCheckUtil().getSecurityInfoDTO(myUserDetails));

        if(myUserDetails != null) model.addAttribute("user", myUserDetails.getUser());

        return "index";
    }

    /**
     * 2023/03/23 // 심규영 // 잘못된 URL 접근 페이지
     * @return
     */
    @GetMapping("error/wrongURL")
    public String wrongURL() {
        return "error/wrongURL";
    }

    /**
     * 2023/03/23 // 심규영 //
     * 2023/03/24 // 라성준 //
     * ajax용 페이징 처리
     *      가져오는 값
     *          type    : 종류 {new : 신설, hit: 흥한갤, live:실시간}
     *          grade   : 게시글 종류 {m:메인, mgall:마이너, mini:미니}
     *          pg      : 페이지
     * @return
     */
    @ResponseBody
    @PostMapping("mainPagingUtil")
    public Map<String, Object> mainPagingUtil(@RequestBody Map<String, String> data) {
        PagingDTO pagingDTO = new PagingDTO();
        Map<String, Object> resultMap = new HashMap<>();

        if(data.get("type").equals("new")) {
            // 페이징
            if(data.get("pg") == null) {
                pagingDTO = new PagingUtil().getPagingDTO(null,service.MainIndexNewCommunityCount(data));
                resultMap.put("pagingDTO", pagingDTO);
            }

            // 페이지 값이 있을 경우
            if(data.get("pg") != null) {
                pagingDTO = new PagingDTO();
                pagingDTO.setStart(Integer.parseInt(data.get("pg")));
            }

            // 리스트 목록 불러오기
            String grade = data.get("grade");
            List<galleryVO> galleryVOS = new ArrayList<>();

            if(grade.equals("m")) galleryVOS = service.MainIndexNewmCommunity(pagingDTO.getStart());
            if(grade.equals("mgall")) galleryVOS = service.MainIndexNewmgellCommunity(pagingDTO.getStart());
            if(grade.equals("mini")) galleryVOS = service.MainIndexNewminiCommunity(pagingDTO.getStart());

            resultMap.put("galleryVOS", galleryVOS);
        }
        
        return resultMap;
    }


    @ResponseBody
    @PostMapping("/RollingGall")
    public Map<String, Object> RollingGall(@RequestBody Map<String, String> data) {
        Map<String, Object> resultMap = new HashMap<>();

        List<galleryVO> MainIndexRollingGall = service.MainIndexRollingGall();
        resultMap.put("MainIndexRollingGall", MainIndexRollingGall);

        if(MainIndexRollingGall != null) resultMap.put("result", 1);

        return resultMap;
    }
}
