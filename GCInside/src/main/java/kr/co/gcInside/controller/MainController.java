package kr.co.gcInside.controller;

import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.service.MainService;
import kr.co.gcInside.utill.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import kr.co.gcInside.vo.galleryVO;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 2023/03/08 // 심규영 // 메인 컨트롤러 생성
 */
@Controller
public class MainController {

    @Autowired
    private MainService service;

    /**
     * 2023.03.22 // 라성준 // 메인 신설갤 불러오기
     */
    @GetMapping(value = {"/", "index"})
    public String index(Model model) {
        // 신설 마이너 갤러리 페이징
        PagingDTO newgellPagingDTO = new PagingUtil().getPagingDTO(null, service.MainIndexNewMgellCommunityCount());

        // 페이징 처리
        List<galleryVO> newMgellCommunityList = service.MainIndexNewMgellCommunity(newgellPagingDTO.getStart());
        List<galleryVO> MainIndexNewCommunity = service.MainIndexNewCommunity(newgellPagingDTO.getStart());
        model.addAttribute("MainIndexNewCommunity", MainIndexNewCommunity);
        model.addAttribute("newMgellCommunityList", newMgellCommunityList);
        model.addAttribute("newgellPagingDTO", newgellPagingDTO);

        return "index";
    }

}
