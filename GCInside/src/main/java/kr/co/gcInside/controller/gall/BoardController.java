package kr.co.gcInside.controller.gall;


import kr.co.gcInside.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

/**
 * 2023/03/18 // 심규영 // 갤러리 글 컨트롤러 생성
 */
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
     *      들어오는 값
     *          기본 공통
     *              id              : 갤러리 주소
     *              search_head     : 말머리 번호
     *              sort_type       : 정렬 타입
     *              page            : 페이지 번호
     *              list_num        : 출력하는 게시물 개수 번호
     *              exception_mode  : 출력 모드 {recommmend:개념글,notice:공지}
     *              s_type          : 검색 타입 {}
     *              s_keyword       : 검색어
     *
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/lists")
    public String list(@PathVariable("grade") String grade,
                       @RequestParam Map<String, String> data) {
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
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/{type}/")
    public String board(@PathVariable("grade") String grade, @PathVariable("type") String type,
                        @RequestParam Map<String, String> data,
                        Model model) {
        // 주소 체크
        if(service.URLCheck(grade,type)) return "index";
        
        // id 값에 따른 갤러리 정보 불러오기
        // 불러오는 내용
        // 갤러리 말머리 설정
        service.selectGellInfo(data.get("id"));

        // 페이지 종류 전송
        model.addAttribute("type", type);
        model.addAttribute("grade", grade);

        return "gall/board/total";
    }

    /**
     * 2023/03/16 // 심규영 // 글 작성 에디터 iframe 주소
     * @return
     */
    @GetMapping("gall/board/editor")
    public String editorIframe(){
        return "gall/board/editor";
    }

}
