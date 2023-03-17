package kr.co.gcInside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023/03/17 // 라성준 // ad 컨트롤러
 */
@Controller
public class AdController {

    @GetMapping("ad/index")
    public String index(){
        return "ad/index";
    }

    @GetMapping("ad/ad_guide_app1")
    public String ad_guide_app1(){
        return "ad/ad_guide_app1";
    }

    @GetMapping("ad/ad_guide_app2")
    public String ad_guide_app2(){
        return "ad/ad_guide_app2";
    }

    @GetMapping("ad/ad_guide_mo1")
    public String ad_guide_mo1(){
        return "ad/ad_guide_app2";
    }

    @GetMapping("ad/ad_guide_mo2")
    public String ad_guide_mo2(){
        return "ad/ad_guide_mo2";
    }

    @GetMapping("ad/ad_guide_mo3")
    public String ad_guide_mo3(){
        return "ad/ad_guide_mo3";
    }

    @GetMapping("ad/ad_guide_mo4")
    public String ad_guide_mo4(){
        return "ad/ad_guide_mo4";
    }

    @GetMapping("ad/ad_guide_pc1")
    public String ad_guide_pc1(){
        return "ad/ad_guide_pc1";
    }

    @GetMapping("ad/ad_guide_pc2")
    public String ad_guide_pc2(){
        return "ad/ad_guide_pc2";
    }

    @GetMapping("ad/ad_guide_pc3")
    public String ad_guide_pc3(){
        return "ad/ad_guide_pc3";
    }

    @GetMapping("ad/ad_guide_pc4")
    public String ad_guide_pc4(){
        return "ad/ad_guide_pc4";
    }

    @GetMapping("ad/ad_guide_pc5")
    public String ad_guide_pc5(){
        return "ad/ad_guide_pc5";
    }

    @GetMapping("ad/ad_guide_wm1")
    public String ad_guide_wm1(){
        return "ad/ad_guide_wm1";
    }

    @GetMapping("ad/ad_guide_wm2")
    public String ad_guide_wm2(){
        return "ad/ad_guide_wm2";
    }

    @GetMapping("ad/ad_guide_wm3")
    public String ad_guide_wm3(){
        return "ad/ad_guide_wm3";
    }

    @GetMapping("ad/ad_guide_wm4")
    public String ad_guide_wm4(){
        return "ad/ad_guide_wm4";
    }
}
