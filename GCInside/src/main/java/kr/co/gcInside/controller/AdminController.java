package kr.co.gcInside.controller;

import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.entity.UserEntity;
import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.AdminService;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.vo.*;
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
import java.util.Objects;

/**
 * 2023/03/10 // 심규영 // 관리자 컨트롤러 생성
 */
@Slf4j
@Controller
public class AdminController {

    /**
     * 2023/03/10 // 심규영 // 관리자 서비스 연결
     */
    @Autowired
    private AdminService service;

    /**
     * 2023/03/10 // 심규영 // 관리자 메인 인덱스 get맵핑
     */
    @GetMapping("admin/index")
    public String index() {
        return "admin/index";
    }

    /**
     * 2023/03/10 // 심규영 // 관리자 멤버 목록 및 검색 페이지 get맵핑
     * 2023/03/16 // 라성준 // 관리자 멤버 불러오기
     * 2023.03.17 // 라성준 // 관리자 검색 조건에 따른 회원 정보 불러오기
     * 2023.03.20 // 라성준 // 관리자 멤버 리스트 페이징
     *@searchType
     *@keyword
     *@return
     */
    @GetMapping("admin/member/search")
    public String memberSearch(Model model,
                               @RequestParam Map<String, String> data) {
        List<MemberVO> memberList = null;

        PagingDTO pagingDTO = new PagingUtil().getPagingDTO(data.get("pg"), service.searchMemberCount());

        if(data.get("keyword") != null)
            memberList = service.searchMembersByCondition(data.get("searchType"), data.get("keyword"), pagingDTO.getStart());
        else memberList = service.SearchMember(pagingDTO.getStart());

        model.addAttribute("search", memberList);
        model.addAttribute("pagingDTO", pagingDTO);

        log.info(pagingDTO.toString());
        return "admin/member/search";
    }

    /**
     * 2023/03/21 // 라성준 // 관리자 갤러리 리스트 get 맵핑
     * @return
     */
    @GetMapping("admin/gallery/gallery_list")
    public String AdminGalleryList(Model model) {
        List<galleryVO> list = service.AdminGalleryList();

        model.addAttribute("list", list);
        log.info(list.toString());
        return "admin/gallery/gallery_list";
    }


    /**
     * 2023/03/10 // 심규영 // 관리자 약관 설정 페이지 get 맵핑
     * @return
     */
    @GetMapping("admin/config/terms")
    public String configTerms(Model model) {
        List<TermsVO> terms = service.selectTerms();

        model.addAttribute("terms", terms);

        return "admin/config/terms";
    }

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 업데이트 post 맵핑
     *      들어오는 값
     *      type    => 약관 번호
     *      content => 약관 내용
     * @param data
     */
    @ResponseBody
    @PostMapping("admin/config/updateTerm")
    public Map<String, Object> updateTerm(@RequestBody Map<String, String> data) {
        int result = 0;

        result = service.updateTerms(data.get("type"), data.get("content"));

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", result);

        return resultMap;
    }

    /**
     * 2023/03/16 // 김재준 // 관리자 메인갤러리 생성 get 매핑
     * @return
     */
    @GetMapping("admin/gallery/create_main")
    public String createMainGallery (Model model) {

        List<gall_cate2VO> cates = service.selectGalleryCates();

        model.addAttribute("cates", cates);

        return "admin/gallery/create_main";
    }
    /**
     * 2023/03/16 // 김재준 // 관리자 메인갤러리 생성 post 매핑
     * 2023/03/20 // 심규영 // 관리자 메인갤러리 setting 생성 추가
     * @return
     */
    @PostMapping("admin/gallery/create_main")
    public String createMainGallery (HttpServletRequest req, Model model, galleryVO vo, @AuthenticationPrincipal MyUserDetails myUser) {
        UserEntity user = myUser.getUser();

        vo.setGell_manager(user.getMember_uid());

        vo.setGell_name(req.getParameter("gell_name"));
        vo.setGell_address(req.getParameter("gell_address"));
        vo.setGell_info(req.getParameter("gell_info"));

        service.createMainGallery(vo);
        // 갤러리 셋팅 생성
        service.createMainGallerySetting(vo.getGell_num());

        log.info("갤러리 생성 : " + vo.getGell_name() + " / " + vo.getGell_address() + " / " + vo.getGell_info() + " / " + vo.getGell_manager());
        log.info("vo 정보 불러오기 : " + vo);

        return "redirect:/admin/index";
    }

    /**
     * 2023/03/22 // 김재준 // 관리자 갤러리 개설 신청 list get 매핑
     */
    @GetMapping("admin/gallery/form_minor")
    public String galleryRequestList(Model model) {
        // 갤러리 개설 신청 리스트 불러오기
        List<CreateVO> list = service.galleryRequestList();

        // 카테고리 이름 불러오기
        List<gall_cate2VO> cates = service.selectGalleryCates();

        model.addAttribute("cates", cates);
        model.addAttribute("list", list);

        return "admin/gallery/form_minor";
    }
}
