package kr.co.gcInside.service;

import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.vo.Gell_sub_managerVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 2023/03/20 // 심규영 // 보드 서비스 생성
 */
@Service
public class BoardService {

    /**
     * 2023/03/20 // 심규영 // board dao 연결
     */
    @Autowired
    private BoardDAO dao;
    
    // create

    /**
     * 2023/03/22 // 심규영 // 게시물 작성 DAO
     * @param data
     * @return
     */
    public int insertArticle(Map<String, String> data) {
        return dao.insertArticle(data);
    }

    // read

    /**
     * 2023/03/20 // 심규영 // 갤러리 정보 불러오기
     * 2023/03/23 // 심규영 // 갤러리 정보 불러오기 조건(grade) 추가
     * @param gell_address
     * @return
     */
    public galleryVO selectGellInfo(String gell_address, String grade) {
        return dao.selectGellInfo(gell_address, grade);
    }

    /**
     * 2023/03/24 // 심규영 // 갤러리 부매니저 정보 가져오기
     * @param gell_num
     * @return
     */
    public List<Gell_sub_managerVO> selectSubManagerInfo(int gell_num) {
        return dao.selectSubManagerInfo(gell_num);
    }

    /**
     * 2023/03/23 // 심규영 // 갤러리 게시물 리스트 가져오기
     * @param data
     * @return
     */
    public List<gell_articleVO> selectArticles(Map<String, String> data) {
        return dao.selectArticles(data);
    }

    /**
     * 2023/03/26 // 심규영 // 갤러리 게시물 가져오기
     *      사용 하는 정보
     *          article_num(no)             : 게시물 번호
     *          articlel_gel_num(gell_num)  : 해당 게시물이 있는 갤러리 번호
     * @param data
     * @return
     */
    public gell_articleVO selectArticle(Map<String, String> data) {
        return dao.selectArticle(data);
    }

    /**
     * 2023/03/27 // 심규영 // 갤러리 게시물 가져오기 에디터용
     * @param no
     * @return
     */
    public gell_articleVO selectArticleEditor(String no) {
        return dao.selectArticleEditor(no);
    }

    /**
     * 2023/03/23 // 심규영 // 갤러리 게시물 리스트 총 갯수 가져오기
     * @param data
     * @return
     */
    public int selectCountArticles(Map<String, String> data) {
        return dao.selectCountArticles(data);
    }

    /**
     * 2023/03/22 // 심규영 // 갤러리 존재 유무 확인용
     * @param gell_num
     * @return
     */
    public int selectGellCheck(String gell_num) {
        return dao.selectGellCheck(gell_num);
    }

    /**
     * 2023/03/22 // 심규영 // 유저 존재 유무 확인용
     * @param member_uid
     * @return
     */
    public int  selectMemberCheck(String member_uid) {
        return dao.selectMemberCheck(member_uid);
    }

    /**
     * 2023/03/22 // 심규영 // 말머리 확인용
     * @param sub_cate
     * @param gell_num
     * @return
     */
    public int selectSubCateCheck(String sub_cate, String gell_num) {
        return dao.selectSubCateCheck(sub_cate, gell_num);
    }

    // upload
    // delete
    // service

    /**
     * 2023/03/20 // 심규영 // URL 체크 기능
     */
    public boolean URLCheck(String grade, String type) {
        // 체크용 result , 기본 false : 통과
        boolean result = false;

        // 갤러리 등급 주소 확인
        if(!grade.equals("m") && !grade.equals("mgall") && !grade.equals("mini")) result = true;

        // 갤러리 보드 주소 확인
        if(!type.equals("view") && !type.equals("modify") && !type.equals("write")) result = true;

        return result;
    }

    /**
     * 2023/03/22 // 심규영 // 글쓰기 추가 유효성 검사
     *
     *      <p>data 들어오는 값</p>
     *      <pre>
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
     *          sub_cate            : 말머리 번호
     *          </pre>
     */
    public boolean WriteValidation(Map<String, String> data) {
        // 갤러리 번호 존재 검사
        int gellCheck = selectGellCheck(data.get("article_gell_num"));
        if(gellCheck == 0) return false;
        
        // 유저 정보 존재 검사
        if(data.get("userLogin").equals("0")) {
            int memberCheck = selectMemberCheck(data.get("article_uid"));
            if(memberCheck == 0) return false;
        }
        
        // 말머리 사용시 말머리 번호 존재 유효성 검사
        if(!data.get("sub_cate_info").equals("0")) { // 말머리 설정이 켜져 있을때
            if(!data.get("sub_cate").equals("0")) { // 말머리가 일반이 아닐때
                if(selectSubCateCheck(data.get("sub_cate"), data.get("article_gell_num")) == 0) return false;
            }
        }

        return true;
    }

    /**
     * 2023/03/23 // 심규영 // 게시물 리스트 페이징 처리 분리
     * @param data
     * @return
     */
    public PagingDTO listsPaging(Map<String, String> data) {
        String count = data.get("list_num");
        PagingDTO pagingDTO = new PagingDTO();

        // 개수 값이 없을 경우 기본 불러오는 개수 50개
        if(count == null) pagingDTO = new PagingUtil().getPagingDTO(data.get("page"), selectCountArticles(data), "50");
        else pagingDTO = new PagingUtil().getPagingDTO(data.get("page"), selectCountArticles(data), count);
        
        return pagingDTO;
    }
}
