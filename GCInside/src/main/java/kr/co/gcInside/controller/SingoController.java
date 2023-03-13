package kr.co.gcInside.controller;

import kr.co.gcInside.vo.SingoVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023/03/13 // 라성준 // 신고컨트롤러
 */

@Controller
public class SingoController {


    @GetMapping("/cs/singo")
    public String singo() {
        return "cs/singo";
    }

    @GetMapping("/cs/singo_write")
    public String singo_write(Model model) {
        SingoVO vo = new SingoVO();
        model.addAttribute("singoVO", vo);
        return "cs/singo_write";
    }
}
