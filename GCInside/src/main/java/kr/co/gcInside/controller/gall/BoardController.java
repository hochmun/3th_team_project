package kr.co.gcInside.controller.gall;


import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.BoardService;
import kr.co.gcInside.utill.SecurityCheckUtil;
import kr.co.gcInside.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
     *          total                       : 전체 게시글 개수
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

        // 갤러리 조회 수 증가
        service.insertGellHitLog(galleryVO.getGell_num());
        service.updateGellHitCount(galleryVO.getGell_num());
        
        // 갤러리 서브 매니저 정보 가져오기
        List<Gell_sub_managerVO> gellSubManagerVOS = service.selectSubManagerInfo(galleryVO.getGell_num());

        // data에 개념글 추천수 개수 설정 넣기
        data.put("setting_recommend_standard", galleryVO.getGellSettingVO().getSetting_recommend_standard()+"");
        
        // 페이징 처리
        PagingDTO pagingDTO = service.listsPaging(data);

        // 게시글 정보 가져오기
        data.put("start", pagingDTO.getStart()+"");
        data.put("gell_num", galleryVO.getGell_num()+"");
        data.put("total", galleryVO.getGell_article_count()+"");
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
     * 2023/03/18 // 심규영  // 글 목록 화면 불러오기 완료<br>
     * 2023/03/22 // 심규영 // 글 쓰기 기본 기능 구현 완료<br>
     * 2023/03/27 // 심규영 // 글 보기 기본 기능 구현 완료
     *
     * <pre>     restAPI 정보
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
     *          
     *      session 값
     *          nonmemberPassCheck :</pre>
     *          
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/{type}/")
    public String board(@PathVariable("grade") String grade, @PathVariable("type") String type,
                        @RequestParam Map<String, String> data,
                        Model model,
                        @AuthenticationPrincipal MyUserDetails myUserDetails,
                        HttpSession session) {
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
        
        // 세션값 가져오기
        if(session.getAttribute("nonmemberPassCheck") != null) {
            boolean passCheck = (Boolean) session.getAttribute("nonmemberPassCheck");
            session.removeAttribute("nonmemberPassCheck");
            model.addAttribute("passCheck", passCheck);
        }
        
        // 페이지 타입이 글 보기 일 경우
        if(type.equals("view")) {
            // data에 개념글 추천수 개수 설정 넣기
            data.put("setting_recommend_standard", galleryVO.getGellSettingVO().getSetting_recommend_standard()+"");

            // 게시글 페이징 처리
            PagingDTO pagingDTO = service.listsPaging(data);

            // 게시글 정보 가져오기
            data.put("start", pagingDTO.getStart()+"");
            data.put("gell_num", galleryVO.getGell_num()+"");
            List<gell_articleVO> gellArticleVOS = service.selectArticles(data);
            
            // 해당 게시글 조회 수 증가
            service.updateArticleHitCount(articleVO.getArticle_num());
            
            // 모델
            model.addAttribute("gellArticleVOS", gellArticleVOS);
            model.addAttribute("pagingDTO", pagingDTO);
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
     * 2023/03/28 // 심규영 // 삭제 페이지 get 맵핑
     *      data 들어오는 값
     *          id : 갤러리 주소
     *          no : 게시글 번호
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/delete/")
    public String delete(@PathVariable("grade") String grade,
                         @RequestParam Map<String, String> data,
                         Model model,
                         @AuthenticationPrincipal MyUserDetails myUserDetails,
                         HttpSession session) {
        // id 값에 따른 갤러리 정보 불러오기
        galleryVO galleryVO = service.selectGellInfo(data.get("id"), grade);

        // 해당 id의 갤러리 정보가 없을 경우 잘못된 접근 페이지 이동
        if(galleryVO == null) return "error/wrongURL";

        // 글 내용 불러오기
        data.put("gell_num", galleryVO.getGell_num()+""); // data에 갤러리 번호 널기
        gell_articleVO articleVO = service.selectArticle(data);

        // 해당 게시글 정보가 없을 경우 잘못된 접근z
        if(articleVO == null) return "error/wrongURL";

        // 세션값 가져오기
        if(session.getAttribute("nonmemberPassCheck") != null) {
            boolean passCheck = (Boolean) session.getAttribute("nonmemberPassCheck");
            session.removeAttribute("nonmemberPassCheck");
            model.addAttribute("passCheck", passCheck);
        }

        // 모델 전송
        model.addAttribute("grade", grade);
        model.addAttribute("galleryVO", galleryVO);
        model.addAttribute("articleVO", articleVO);
        model.addAttribute("authorize", new SecurityCheckUtil().getSecurityInfoDTO(myUserDetails));

        if(myUserDetails != null) model.addAttribute("user", myUserDetails.getUser());

        return "gall/board/delete";
    }

    /**
     * 2023/03/16 // 심규영 // 글 작성 에디터 iframe 주소
     *      들어오는 값
     *          no      : 게시물 번호
     *          type    : 페이지 타입(글 보기, 글 수정, 글 쓰기)
     * @return
     */
    @GetMapping("gall/board/editor")
    public String editorIframe(@RequestParam Map<String, String> data, Model model){

        gell_articleVO articleVO = null;
        if(data.get("no") != null) articleVO = service.selectArticleEditor(data.get("no"));

        model.addAttribute("articleVO", articleVO);
        model.addAttribute("data", data);

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
        
        // 게시글 작성 완료시 갤러리 게시글 개수 증가
        if(result > 0) service.updateGellArticleCount(data.get("article_gell_num"));

        return resultMap;
    }

    /**
     * 2023/03/28 // 심규영 // 댓글 작성 post 맵핑
     * <pre>     data 들어오는 값
     *          no                  : 게시물 번호
     *          login_info          : 로그인 상태
     *          comment_uid         : 회원 uid
     *          comment_name        : 비회원 name
     *          comment_password    : 비회원 password
     *          comment_content     : 댓글 내용
     *      
     *      data 에 넣는 값
     *          regip               : 작성자 주소</pre>
     * @param data
     * @return result => {0:실패, 1:성공}
     */
    @ResponseBody
    @PostMapping("gall/board/commentWrite")
    public Map<String, Object> commentWrite(@RequestBody Map<String, String> data,
                                            HttpServletRequest req,
                                            @AuthenticationPrincipal MyUserDetails myUserDetails) {
        Map<String, Object> resultMap = new HashMap<>();

        // data 에 regip 등록
        data.put("regip", req.getRemoteAddr());
        
        // vo에 담기
        Gell_commentVO commentVO = service.commentVOInsert(data);
        
        // 댓글 작성
        int result = service.insertComment(commentVO);

        // 댓글 작성시 댓글 수 증가
        service.updateArticleCommentCount(data.get("no"));
        
        // 닉네임 가져오기
        if(myUserDetails != null) commentVO.setMember_nick(myUserDetails.getUser().getMember_nick());

        // 현재 날짜 저장
        commentVO.setComment_rdate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        // resultMap 에 result 등록
        resultMap.put("result", result);
        resultMap.put("commentVO", commentVO);

        return resultMap;
    }

    /**
     * 2023/03/29 // 심규영 // 대댓글 작성 post mapping
     * <pre>     data 들어오는 값
     *          re_comment_ori_num              : 댓글 번호
     *          re_comment_article_num          : 게시글 번호
     *          re_comment_content              : 대댓글 내용
     *          login_info                      : 로그인 여부 {true, false}
     *          re_comment_uid                  : 회원 uid
     *          re_comment_nonmember_name       : 비회원 name
     *          re_comment_nonmember_password   : 비회원 password
     *          
     *      data 넣는 값
     *          regip                           : 대댓글 작성자 ip</pre>
     * @param data
     * @param req
     * @return
     */
    @ResponseBody
    @PostMapping("gall/board/reCommentWrite")
    public Map<String, Object> reCommentWrite(@RequestBody Map<String, String> data,
                                              HttpServletRequest req,
                                              @AuthenticationPrincipal MyUserDetails myUserDetails) {
        Map<String, Object> resultMap = new HashMap<>();
        
        // regip 넣기
        data.put("regip", req.getRemoteAddr());
        
        // VO에 값 넣기
        Gell_re_commentVO reCommentVO = service.reCommentVOInsert(data);
        log.info("re_comment_login_status : "+reCommentVO.getRe_comment_login_status());
        
        // 댓글 작성
        int result = service.insertReComment(reCommentVO);

        // 댓글 작성시 댓글 수 증가 및 댓글의 대댓글 수 증가
        service.updateArticleCommentCount(data.get("re_comment_article_num"));
        service.updateCommentReCount(data.get("re_comment_ori_num"));

        // 닉네임 가져오기
        if(myUserDetails != null) reCommentVO.setMember_nick(myUserDetails.getUser().getMember_nick());

        // 현재 날짜 저장
        reCommentVO.setRe_comment_rdate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        // resultMap 에 result 등록
        resultMap.put("result", result);
        resultMap.put("commentVO", reCommentVO);

        return resultMap;
    }

    /**
     * 2023/03/28 // 심규영 // 글 수정 post mapping
     *      data 들어오는 값
     *          gell_num        : 겔러리 번호
     *          modify_no       : 수정 하는 게시글 번호
     *          modify_uid      : 수정 하는 게시글 작성자 아이디 ("")
     *          article_title   : 수정 하는 게시글 제목
     *          content         : 수정 하는 게시글 내용
     *          sub_cate        : 말머리(null)
     *          
     * @param data
     * @return
     */
    @ResponseBody
    @PostMapping("gall/board/articleModify")
    public Map<String, Object> articleModify(@RequestBody Map<String,String> data,
                                             @AuthenticationPrincipal MyUserDetails myUserDetails) {
        Map<String, Object> resultMap = new HashMap<>();
        
        // modify_uid의 값이 있을 경우 작성자와 수정자의 uid 일치 확인
        if(!data.get("modify_uid").equals("") && myUserDetails != null) {
            if(!data.get("modify_uid").equals(myUserDetails.getUser().getMember_uid())) {
                resultMap.put("result", -1);
                return resultMap;
            }
        }

        // 게시글 업데이트
        int result = service.updateArticle(data);
        resultMap.put("result", result);

        return resultMap;
    }

    /**
     * 2023/03/28 // 심규영 // 게시글 삭제 Post 맵핑
     *      data 에 들어오는 값
     *          gell_num        : 갤러리 번호
     *          article_num     : 게시물 번호
     *          id              : 갤러리 주소
     *          grade           : 갤러리 종류
     *          article_uid     : 게시글 작성자 uid
     *          
     *      data 에 넣는 값
     *          delete_uid      : 삭제하는 유저 uid
     */
    @PostMapping("gall/board/articleDelete")
    public String articleDelete(@RequestParam Map<String,String> data,
                                @AuthenticationPrincipal MyUserDetails myUserDetails) {
        // modify_uid의 값이 있을 경우 작성자와 수정자의 uid 일치 확인
        if(!data.get("article_uid").equals("") && myUserDetails != null) {
            if(!data.get("article_uid").equals(myUserDetails.getUser().getMember_uid())) {
                return "redirect:/error/wrongURL";
            }
        }

        // data 넣기
        if(myUserDetails != null) data.put("delete_uid", myUserDetails.getUser().getMember_uid());

        // 게시글 삭제
        service.updateDeleteArticle(data);
        
        return "redirect:/"+data.get("grade")+"/board/lists?id="+data.get("id");
    }

    /**
     * 2023/03/27 // 심규영 // 비회원 비밀 번호 확인
     *      들어오는 값
     *          id      : 갤러리 번호
     *          no      : 게시글 번호
     *          pass    : 게시글 비밀번호
     * 
     * @return
     */
    @ResponseBody
    @PostMapping("gall/board/nonmemberPassCheck")
    public Map<String, Object> nonmemberPassCheck(@RequestBody Map<String, String> data, HttpSession session){
        // 리턴 하는 map
        Map<String, Object> resultMap = new HashMap<>();

        // 비밀 번호 체크
        int result = service.selectNonmemberCheck(data);
        resultMap.put("result", result);

        if(result > 0) {
            session.setAttribute("nonmemberPassCheck", true);
        }

        return resultMap;
    }

    /**
     * 2023/04/04 // 심규영 // 댓글 목록 불러오기
     *      data 에 들어오는 값
     *          start : 페이지 시작 글 번호
     *          article_num : 게시물 번호
     *          type : 정렬 타입
     * @param data
     * @return
     */
    @ResponseBody
    @PostMapping("gall/board/getCommentList")
    public Map<String, Object> getCommentList(@RequestBody Map<String, String> data) {
        Map<String,Object> resultMap = new HashMap<>();

        // 댓글 목록 불러오기
        Map<String, List<Gell_commentVO>> commentLists = service.selectComments(Integer.parseInt(data.get("article_num")), Integer.parseInt(data.get("start")), data.get("type"));
        resultMap.put("commentLists", commentLists);

        return resultMap;
    }

    /**
     * 2023/04/06 // 심규영 // 추천, 비추천 처리 Post 맵핑
     *<pre>       data 들어오는 값
     *          article_num         : 게시물 번호
     *          articlel_gell_num   : 게시글 갤러리 번호
     *          type                : 추천, 비추천 구분 {0:추천,1:비추천}
     *          
     *      data 에 넣는 값
     *          login_type          : 로그인 상태 구분 {0:회원,1:비회원}
     *          regip               : ip 기록</pre>
     * @param data
     * @return
     */
    @ResponseBody
    @PostMapping("gall/board/setRecommendArticle")
    public Map<String, Object> setRecommendArticle(@RequestBody Map<String, String> data,
                                                   @AuthenticationPrincipal MyUserDetails myUserDetails,
                                                   HttpServletRequest req) {
        Map<String, Object> resultMap = new HashMap<>();

        // 추천 하는 유저의 로그인 상태 확인
        if(myUserDetails != null) data.put("login_type", "0"); //회원
        else data.put("login_type", "1"); // 비회원
        
        // 추천 하기전 24시간 이내 추천 기록 확인
        data.put("regip", req.getRemoteAddr());
        int result1 = service.selectCountRecommendLog(data);
        if(result1 > 0){ // 오늘 추천 기록이 있으면
            resultMap.put("result1",result1);
            return resultMap; // 반환
        }

        // 추천, 비추천 처리
        int result2 = service.updateArticleRecommendCount(data);
        resultMap.put("result2", result2);
        
        if(result2 > 0) { // 추천 처리에 성공했을 경우 로그 남기기
            service.insertRecommendLog(data);
        }

        resultMap.put("login_type", data.get("login_type")); // 로그인 상태 전송

        return resultMap;
    }

}
