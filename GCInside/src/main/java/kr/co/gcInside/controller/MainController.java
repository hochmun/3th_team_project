package kr.co.gcInside.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.MainService;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.utill.SecurityCheckUtil;
import kr.co.gcInside.vo.gell_articleVO;
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
    @GetMapping(value = {"/", "index"})                        // HTTP GET 요청을 처리하는 메소드임을 나타냄
    public String index(Model model, @AuthenticationPrincipal MyUserDetails myUserDetails) {  // Model 객체와 MyUserDetails 객체를 파라미터로 받음
        Map<String, String> data = new HashMap<>();                                           // HashMap 객체 생성
        data.put("grade", "mgall");                                                           // "grade"라는 key와 "mgall"라는 value를 가지는 데이터 추가

        // 신설 마이너 갤러리 페이징
        PagingDTO newgellPagingDTO = new PagingUtil().getPagingDTO(null, service.MainIndexNewCommunityCount(data)); // PagingUtil 객체를 이용하여 PagingDTO 객체 생성

        // 페이징 처리
        List<galleryVO> newMgellCommunityList = service.MainIndexNewmgellCommunity(newgellPagingDTO.getStart());   // MainService의 MainIndexNewmgellCommunity 메소드를 호출하여 List<galleryVO> 타입의 데이터 가져오기

        // HIT 갤러리
        List<gell_articleVO> article = service.hitgall();                                                           // MainService의 hitgall 메소드를 호출하여 List<gell_articleVO> 타입의 데이터 가져오기

        model.addAttribute("article", article);                                                         // "article"이라는 이름으로 article 데이터 전달
        model.addAttribute("newMgellCommunityList", newMgellCommunityList);                             // "newMgellCommunityList"라는 이름으로 newMgellCommunityList 데이터 전달
        model.addAttribute("newgellPagingDTO", newgellPagingDTO);                                       // "newgellPagingDTO"라는 이름으로 newgellPagingDTO 데이터 전달
        model.addAttribute("authorize", new SecurityCheckUtil().getSecurityInfoDTO(myUserDetails));     // "authorize"라는 이름으로 MyUserDetails 객체를 이용하여 보안 정보 데이터 전달

        if(myUserDetails != null) model.addAttribute("user", myUserDetails.getUser());                  // myUserDetails가 null이 아닐 경우 "user"라는 이름으로 myUserDetails의 user 객체 데이터 전달

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

    /**
     * 2023/03/25 // 라성준 //
     * @param data
     * @return
     */
    @ResponseBody
    @PostMapping("/RollingGall")
    public Map<String, Object> RollingGall(@RequestBody Map<String, String> data) {
        Map<String, Object> resultMap = new HashMap<>();

        List<galleryVO> MainIndexRollingGall = service.MainIndexRollingGall();
        resultMap.put("MainIndexRollingGall", MainIndexRollingGall);

        if(MainIndexRollingGall != null) resultMap.put("result", 1);

        return resultMap;
    }

    /**
     * 2023/04/17 // 심규영 // 전날 게시글 갯수, 댓글 개수 구하는 기능
     * @return
     */
    @ResponseBody
    @PostMapping("mainIndex/yesterdayCount")
    public Map<String, Object> yesterdayCount() {
        Map<String, Object> resultMap = new HashMap<>();

        Map<String, Object> count = service.selectYesterdayCount();

        resultMap.put("article_count", count.get("article_count"));
        resultMap.put("comment_count", count.get("comment_count"));

        return resultMap;
    }

    /**
     * 2023/04/18 // 심규영 // 실시간 베스트 게시글 가져오는 기능
     * @param data => {
     *             "pg" : 페이지 번호
     * }
     * @return
     */
    @ResponseBody
    @PostMapping("mainIndex/realtimeGetArticleList")
    public Map<String, Object> realtimeGetArticleList(@RequestBody Map<String, String> data) {
        Map<String, Object> resultMap = new HashMap<>();

        List<gell_articleVO> articleVOS = service.selectRealtimeGetArticleList(data.get("pg"));
        resultMap.put("articleVOS", articleVOS);

        return resultMap;
    }

    /**
     * 2023/04/21 // 김재준 // 카테고리별 개념글 가져오기
     */

}
