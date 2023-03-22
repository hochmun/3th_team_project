package kr.co.gcInside.service;

import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.vo.galleryVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
     * @param gell_address
     * @return
     */
    public galleryVO selectGellInfo(String gell_address) {
        return dao.selectGellInfo(gell_address);
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
        // 게시물 번호 존재 검사
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
}
