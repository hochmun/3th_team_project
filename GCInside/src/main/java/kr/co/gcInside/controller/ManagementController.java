package kr.co.gcInside.controller;

import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.ManagementService;
import kr.co.gcInside.vo.Gell_SettingVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_manage_logVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 컨트롤러 생성
 */
@Slf4j // Lombok 어노테이션으로 log 객체를 자동으로 생성해준다.
@Controller // 해당 클래스가 스프링 MVC에서 컨트롤러로 사용됨을 선언한다.
public class ManagementController {

    @Autowired // Spring IoC 컨테이너가 ManagementService 클래스의 인스턴스를 자동으로 주입하도록 한다.
    private ManagementService service;

    /**
     * 2023.03.29 // 라성준 //
     *      들어오는 값
     *          id : 갤러리 주소(gell_address)
     *          cate : 갤러리 카테고리(gell_cate)
     * @return
     */
    @GetMapping("gall/management/index")
    public String index (@RequestParam Map<String, String> data, Model model) { // modelInput 메서드를 이용해 데이터를 전달할 수 있는 경우에만 처리한다.
        if(!service.modelInput(data, model)) return "error/wrongURL"; // 전달된 데이터가 없거나 잘못된 경우 에러 페이지를 반환한다.

        // 전달받은 갤러리 주소를 이용해 게시글과 설정 정보를 가져온다.
        String gell_address = data.get("id");
        Map<String, Object> stringObjectMap = service.selectArticleAndSetting(gell_address);
        if (stringObjectMap == null) {
            return "error/wrongURL";  // 가져온 정보가 없는 경우 에러 페이지를 반환한다.
        }
        stringObjectMap.put("gell_address", gell_address); // 가져온 정보에 갤러리 주소를 추가한다.
        model.addAttribute("stringObjectMap", stringObjectMap); // 모델에 가져온 정보를 추가한다.

        return "gall/management/index"; // 가져온 정보를 사용해 갤러리 관리 페이지를 반환한다.
    }

    /**
     * 2023.04.04 // 라성준 //
     *  data 들어오는 값
     *      id          : 갤러리 주소 (필수)
     *      oriDetail   : 변경전 내용
     *      newDetail   : 변경할 내용
     *      grade       : 갤러리 등급 (필수)
     *      cate        : 처리 종류 (필수)
     *      content     : 처리 내용 (필수)
     *      info        : 설명
     * @param data
     * @return
     */
    @ResponseBody
    @PostMapping("gall/management/index")
    public Map<String, Object> index(@RequestBody Map<String, String> data,
                                     @AuthenticationPrincipal MyUserDetails myUserDetails) {
        Map<String, Object> resultMap = new HashMap<>();

        // 파라미터 값들을 추출
        String oriDetail = data.get("oriDetail");
        String newDetail = data.get("newDetail");
        String id = data.get("id");
        String grade = data.get("grade");
        String mg_desc = data.get("mg_desc");
        String cate = data.get("cate");
        String content = data.get("content");

        log.info("newDetail : "+newDetail);
        log.info("content : "+content);

        // 이름 중복 확인 기능
        if(content.equals("content")){
            boolean equalsGell = service.equalsGell(newDetail);
            if(equalsGell){
                int result = -1;
                resultMap.put("result", result);
                return resultMap;
            }
        }


        // 유저 로그인 안함 , -2를 반환
        if(myUserDetails == null){
            int result = -2;
            resultMap.put("result", result);
            return resultMap;
        }

        // gell_name 갤러리 정보 가져옴
        galleryVO galleryVO = service.selectArticleAndSetting(id, grade);

        if (galleryVO == null) {
            throw new RuntimeException("갤러리 정보가 존재하지 않습니다.");
        }

        // 7일 이내 변경 내역이 있으면, -3을 반환
        if (service.checkRecentGellManageLog(galleryVO.getGell_num(), cate, content)) {
            int result = -3;
            resultMap.put("result", result);
            return resultMap;
        }

        // 갤러리 설정을 업데이트하고, 결과를 resultMap에 저장
        Gell_SettingVO settingVO = galleryVO.getGellSettingVO();
        if(content.equals("content")) galleryVO.setGell_name(newDetail);
        if(content.equals("info")) galleryVO.setGell_info(newDetail);

        boolean result = service.updateGellSetting(settingVO, galleryVO );
        resultMap.put("result", result);
        /*
        if (!result) {
            throw new RuntimeException("갤러리 설정 업데이트에 실패했습니다.");
        }
         */
        if(result) {
        // 변경 이력 로그 기능
        gell_manage_logVO gellManageLog = new gell_manage_logVO();
        gellManageLog.setGell_m_l_g_n(galleryVO.getGell_num());
        gellManageLog.setGell_m_l_uid(myUserDetails.getUser().getMember_uid());
        gellManageLog.setGell_m_l_cate(cate);
        gellManageLog.setGell_m_l_content(content);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = sdf.format(new Date());
        gellManageLog.setGell_m_l_data(dateString);

        boolean logResult = service.insertGellManageLog(gellManageLog);

        resultMap.put("logResult", logResult);
        }

        return resultMap;
    }

    @GetMapping("gall/management/delete")
    public String delete (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/delete";

    }

    @GetMapping("gall/management/gallery")
    public String gallery (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/gallery";
    }

    @GetMapping("gall/management/report")
    public String report (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/report";
    }

    @GetMapping("gall/management/submanager")
    public String submanager (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/submanager";
    }

    @GetMapping("gall/management/submanager_certification")
    public String submanager_certification () {
        return "gall/management/submanager_certification";
    }

    @GetMapping("gall/management/block")
    public String block(@RequestParam Map<String, String> data, Model model){
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/block";
    }
}
