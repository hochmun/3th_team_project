package kr.co.gcInside.controller.gall;


import org.springframework.stereotype.Controller;
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
     * 2023/03/18 // 심규영  // 글 목록 화면 불러오기 완료
     *
     *      restAPI 정보
     *          grade => 갤러리 등급 정보
     *              m       : 메인
     *              mgall   : 마이너
     *              mini    : 미니
     *
     *      들어오는 값
     *          id : 갤러리 주소
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
     * 2023/03/18 // 심규영 // 글 쓰기 화면 불러오기
     *
     *      restAPI 정보
     *          grade => 갤러리 등급 정보
     *              m       : 메인
     *              mgall   : 마이너
     *              mini    : 미니
     *
     * @param grade
     * @return
     */
    @GetMapping("{grade}/board/write")
    public String write(@PathVariable("grade") String grade) {
        return "gall/board/write";
    }

    /**
     * 2023/03/18 // 심규영 // 글 보기 화면 불러오기
     *
     *      restAPI 정보
     *          grade => 갤러리 등급 정보
     *              m       : 메인
     *              mgall   : 마이너
     *              mini    : 미니
     *
     * @return
     */
    @GetMapping("{grade}/board/view")
    public String view(@PathVariable("grade") String grade){
        return "gall/board/view";
    }

    /**
     * 2023/03/18 // 심규영 // 글 수정 화면 불러오기
     *
     *      restAPI 정보
     *          grade => 갤러리 등급 정보
     *              m       : 메인
     *              mgall   : 마이너
     *              mini    : 미니
     *
     * @return
     */
    @GetMapping("{grade}/board/modify")
    public String modify(@PathVariable("grade") String grade) {
        return "gall/board/modify";
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
