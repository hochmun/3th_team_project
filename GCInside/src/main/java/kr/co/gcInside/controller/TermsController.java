package kr.co.gcInside.controller;

import kr.co.gcInside.service.TermsService;
import kr.co.gcInside.vo.TermsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

/**
 * Terms 컨트롤러
 * @since 2023/03/08
 * @author 라성준
 *
 */

@Controller
public class TermsController {

    @Autowired
    private TermsService service;

    @GetMapping("/terms/")
    public String terms(Model model, int type){
        Map<Integer, List<TermsVO>> term = service.selectTerm(type);
        String typeName = service.getTypeName(type);

        model.addAttribute("type", type);
        model.addAttribute("term", term);
        model.addAttribute("typeName", typeName);

        return "/terms";
    }

    @GetMapping("/terms/policy")
    public String policy() {
        return "/terms/policy";
    }

    @GetMapping("/terms/privacy")
    public String privacy() {
        return "/terms/privacy";
    }

    @GetMapping("/terms/pay_policy")
    public String pay_policy() {
        return "/terms/pay_policy";
    }

    @GetMapping("/terms/privacy_young")
    public String privacy_young() {
        return "/terms/privacy_young";
    }

    @GetMapping("/terms/youth_policy")
    public String youth_policy(Model model) {
        Map<Integer, List<TermsVO>> data = service.selectTerm(14);

        model.addAttribute("data", data);

        return "/terms/youth_policy";
    }
}
