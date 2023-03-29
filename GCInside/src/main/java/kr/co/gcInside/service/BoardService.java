package kr.co.gcInside.service;

import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.vo.*;
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

    /**
     * 2023/03/28 // 심규영 // 댓글 작성 DAO
     * @return
     */
    public int insertComment(Gell_commentVO vo) {
        return dao.insertComment(vo);
    }

    /**
     * 2023/03/29 // 심규영 // 대댓글 작성 DAO
     * @param vo
     * @return
     */
    public int insertReComment(Gell_re_commentVO vo) {
        return dao.insertReComment(vo);
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

    /**
     * 2023/03/27 // 심규영 // 비회원 게시글 비밀번호 체크
     * @param data
     * @return
     */
    public int selectNonmemberCheck(Map<String, String> data) {
        return dao.selectNonmemberCheck(data);
    }

    /**
     * 2023/03/29 // 심규영 // 게시물 댓글 불러오기 기능
     * @param article_num
     * @return
     */
    public List<Gell_commentVO> selectComments(int article_num) {
        return dao.selectComments(article_num);
    }

    // upload

    /**
     * 2023/03/28 // 심규영 // 글 수정 기능
     *      data 들어오는 값
     *          gell_num        : 겔러리 번호
     *          modify_no       : 수정 하는 게시글 번호
     *          modify_uid      : 수정 하는 게시글 작성자 아이디 ("")
     *          article_title   : 수정 하는 게시글 제목
     *          content         : 수정 하는 게시글 내용
     *          sub_cate        : 말머리(null)
     * @param data
     * @return
     */
    public int updateArticle(Map<String,String> data) {
        return dao.updateArticle(data);
    }

    /**
     * 2023/03/28 // 심규영 // 글 삭제 기능
     *      data 에 들어오는 값
     *          gell_num        : 갤러리 번호
     *          article_num     : 게시물 번호
     *          id              : 갤러리 주소
     *          grade           : 갤러리 종류
     *          article_uid     : 게시글 작성자 uid
     * @param data
     * @return
     */
    public int updateDeleteArticle(Map<String, String> data) {
        return dao.updateDeleteArticle(data);
    }

    /**
     * 2023/03/29 // 심규영 // 댓글 또는 대댓글 작성시 comment 개수 증가 기능
     * @param article_num
     * @return
     */
    public int updateArticleCommentCount(String article_num) {
        return dao.updateArticleCommentCount(article_num);
    }

    /**
     * 2023/03/29 // 심규영 // 댓글의 대댓글 수 증가 기능
     * @param comment_num
     * @return
     */
    public int updateCommentReCount(String comment_num) {
        return dao.updateCommentReCount(comment_num);
    }

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

    /**
     * 2023/03/29 // 심규영 // VO에 담기
     * <pre>     data 들어오는 값
     *          no                  : 게시물 번호
     *          login_info          : 로그인 상태
     *          comment_uid         : 회원 uid
     *          comment_name        : 비회원 name
     *          comment_password    : 비회원 password
     *          comment_content     : 댓글 내용
     *
     *      data 에 넣는 값
     *          regip               : 작성자 주소</pre>
     * @param data
     * @return
     */
    public Gell_commentVO commentVOInsert(Map<String,String> data) {
        Gell_commentVO commentVO = new Gell_commentVO();

        commentVO.setComment_article_num(Integer.parseInt(data.get("no")));
        commentVO.setComment_content(data.get("comment_content"));
        commentVO.setComment_regip(data.get("regip"));
        if(data.get("login_info").equals("true")) {
            commentVO.setComment_login_status(0);
            commentVO.setComment_uid(data.get("comment_uid"));
        } else {
            commentVO.setComment_login_status(1);
            commentVO.setComment_nonmember_name(data.get("comment_name"));
            commentVO.setComment_nonmember_password(data.get("comment_password"));
        }

        return commentVO;
    }

    /**
     * 2023/03/29 // 심규영 // VO에 담기
     * <pre>     data 들어오는 값
     *          re_comment_ori_num              : 댓글 번호
     *          re_comment_article_num          : 게시글 번호
     *          re_comment_content              : 대댓글 내용
     *          login_info                      : 로그인 여부 {true, false}
     *          re_comment_uid                  : 회원 uid
     *          re_comment_nonmember_name       : 비회원 name
     *          re_comment_nonmember_password   : 비회원 password
     *
     *      data 넣는 값
     *          regip                           : 대댓글 작성자 ip</pre>
     * @param data
     * @return
     */
    public Gell_re_commentVO reCommentVOInsert(Map<String, String> data) {
        Gell_re_commentVO reCommentVO = new Gell_re_commentVO();

        reCommentVO.setRe_comment_oir_num(Integer.parseInt(data.get("re_comment_ori_num")));
        reCommentVO.setRe_comment_article_num(Integer.parseInt(data.get("re_comment_article_num")));
        reCommentVO.setRe_comment_content(data.get("re_comment_content"));
        reCommentVO.setRe_comment_login_status(data.get("login_info").equals("true") ? 0 : 1);
        if(data.get("login_info").equals("true")) {
            reCommentVO.setRe_comment_uid(data.get(""));
        } else {
            reCommentVO.setRe_comment_nonmember_name(data.get("re_comment_nonmember_name"));
            reCommentVO.setRe_comment_nonmember_password(data.get("re_comment_nonmember_password"));
        }
        reCommentVO.setRe_comment_regip(data.get("regip"));

        return reCommentVO;
    }
}
