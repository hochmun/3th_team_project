package kr.co.gcInside.controller.gall;


import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.BoardService;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.utill.SecurityCheckUtil;
import kr.co.gcInside.vo.Gell_sub_managerVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023/03/18 // 심규영 // 갤러리 글 컨트롤러 생성
 */
@Slf4j
@Controller
public class BoardController {

    /**
     * 2023/03/20 // 심규영 // 보드 서비스 연결
     */
    @Autowired
    private BoardService service;

    /**
     * 2023/03/18 // 심규영  // 글 목록 화면 불러오기 완료
     *
     *      restAPI 정보
     *          grade => 갤러리 등급 정보
     *              m       : 메인
     *              mgall   : 마이너
     *              mini    : 미니
     *
     *      Map data에 들어오는 값
     *          기본 공통
     *              id              : 갤러리 주소
     *              search_head     : 말머리 번호
     *              sort_type       : 정렬 타입 (안 씀)
     *              page            : 페이지 번호
     *              list_num        : 출력하는 게시물 개수 번호
     *              exception_mode  : 출력 모드 {recommmend:개념글,notice:공지}
     *              s_type          : 검색 타입 {title+content:제목+내용,title:제목,content:내용,user:글쓴이,comment:댓글}
     *              s_keyword       : 검색어
     *              
     *      Map data 에 넣는 값
     *          setting_recommend_standard  : 추천 글 추천 갯수 설정 값 => 출력 모드 recommend에 사용
     *          start                       : 페이지 시작 값
     *          gell_num                    : 겔러리 번호
     *
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/lists")
    public String list(@PathVariable("grade") String grade,
                       @RequestParam Map<String, String> data,
                       Model model,
                       @AuthenticationPrincipal MyUserDetails myUserDetails) {
        // id 값에 따른 갤러리 정보 불러오기
        galleryVO galleryVO = service.selectGellInfo(data.get("id"), grade);

        // 해당 id의 갤러리 정보가 없을 경우 잘못된 접근 페이지 이동
        if(galleryVO == null) return "error/wrongURL";
        
        // 갤러리 서브 매니저 정보 가져오기
        List<Gell_sub_managerVO> gellSubManagerVOS = service.selectSubManagerInfo(galleryVO.getGell_num());

        // data에 개념글 추천수 개수 설정 넣기
        data.put("setting_recommend_standard", galleryVO.getGellSettingVO().getSetting_recommend_standard()+"");
        
        // 페이징 처리
        PagingDTO pagingDTO = service.listsPaging(data);

        // 게시글 정보 가져오기
        data.put("start", pagingDTO.getStart()+"");
        data.put("gell_num", galleryVO.getGell_num()+"");
        List<gell_articleVO> gellArticleVOS = service.selectArticles(data);

        // model 전송
        model.addAttribute("galleryVO", galleryVO);
        model.addAttribute("gellSubManagerVOS", gellSubManagerVOS);
        model.addAttribute("gellArticleVOS", gellArticleVOS);
        model.addAttribute("pagingDTO", pagingDTO);
        model.addAttribute("grade", grade);
        model.addAttribute("authorize", new SecurityCheckUtil().getSecurityInfoDTO(myUserDetails));

        if(myUserDetails != null) model.addAttribute("user", myUserDetails.getUser());
        
        return "gall/board/lists";
    }

    /**
     * 2023/03/18 // 심규영  // 글 목록 화면 불러오기 완료
     *
     *      restAPI 정보
     *          grade => 갤러리 등급 정보
     *              m       : 메인
     *              mgall   : 마이너
     *              mini    : 미니
     *
     *          type => 페이지 구별 용
     *              view    : 보기
     *              write   : 쓰기
     *              modify  : 수정
     *
     *      들어오는 값
     *          기본 공통
     *              id : 갤러리 주소
     *          수정, 보기
     *              no : 글 번호
     *              pg : 페이지 번호
     *              
     *      data에 집어 넣는 값
     *          gell_num : 겔러리 번호
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/{type}/")
    public String board(@PathVariable("grade") String grade, @PathVariable("type") String type,
                        @RequestParam Map<String, String> data,
                        Model model,
                        @AuthenticationPrincipal MyUserDetails myUserDetails) {
        // 주소 체크
        if(service.URLCheck(grade,type)) return "index";

        // id 값에 따른 갤러리 정보 불러오기
        galleryVO galleryVO = service.selectGellInfo(data.get("id"), grade);

        // 해당 id의 갤러리 정보가 없을 경우 잘못된 접근 페이지 이동
        if(galleryVO == null) return "error/wrongURL";

        // 글 번호가 있을 경우 글 내용 불러오기
        data.put("gell_num", galleryVO.getGell_num()+""); // data에 갤러리 번호 널기
        gell_articleVO articleVO = null;
        if(data.get("no") != null) {
            articleVO = service.selectArticle(data);

            // 해당 게시글 정보가 없을 경우 잘못된 접근z
            if(articleVO == null) return "error/wrongURL";
        }

        // 페이지 종류 전송
        model.addAttribute("type", type);
        model.addAttribute("grade", grade);
        model.addAttribute("galleryVO", galleryVO);
        model.addAttribute("articleVO", articleVO);
        model.addAttribute("authorize", new SecurityCheckUtil().getSecurityInfoDTO(myUserDetails));

        if(myUserDetails != null) model.addAttribute("user", myUserDetails.getUser());

        return "gall/board/total";
    }

    /**
     * 2023/03/16 // 심규영 // 글 작성 에디터 iframe 주소
     *      들어오는 값
     *          no
     * @return
     */
    @GetMapping("gall/board/editor")
    public String editorIframe(@RequestParam Map<String, String> data, Model model){

        gell_articleVO articleVO = null;
        if(data.get("no") != null) articleVO = service.selectArticleEditor(data.get("no"));

        model.addAttribute("articleVO", articleVO);

        return "gall/board/editor";
    }

    /**
     * 2023/03/22 // 심규영 // 글 작성 post 맵핑
     *      <p>들어오는 값</p><pre>
     *          article_gell_num    : 게시물이 올라가는 갤러리 번호
     *          userLogin           : 유저 로그인 정보 (0:회원,1:비회원)
     *          sub_cate_info       : 말머리 사용 정보 (0:사용안함)
     *          article_title       : 게시물 제목
     *          article_content     : 게시물 내용
     *
     *          nonmember_uid       : 비회원 아이디
     *          nonmember_pass      : 비회원 비밀번호
     *          article_uid         : 회원 아이디
     *
     *          sub_cate            : 말머리 번호</pre>
     */
    @ResponseBody
    @PostMapping("gall/board/articleWrite")
    public Map<String, Object> articleWrite(@RequestBody Map<String, String> data,
                             HttpServletRequest req) {
        // 리턴할 결과 값
        int result = 0;

        Map<String, Object> resultMap = new HashMap<>();

        // 추가 유효성 검사
        if(!service.WriteValidation(data)) { // 유효성 검사 실패시
            resultMap.put("result", -1);
            return resultMap;
        }
        
        // 게시글 작성
        data.put("article_regip", req.getRemoteAddr());
        result = service.insertArticle(data);
        resultMap.put("result", result);

        return resultMap;
    }

}
