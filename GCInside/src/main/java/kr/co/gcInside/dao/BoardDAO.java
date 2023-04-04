package kr.co.gcInside.dao;

import kr.co.gcInside.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 2023/03/20 // 심규영 // 보드 dao 생성
 */
@Mapper
@Repository
public interface BoardDAO {
    // create

    /**
     * 2023/03/22 // 심규영 // 게시물 작성 DAO
     * @param data
     * @return
     */
    public int insertArticle(Map<String, String> data);

    /**
     * 2023/03/28 // 심규영 // 댓글 작성 DAO
     * @return
     */
    public int insertComment(Gell_commentVO vo);

    /**
     * 2023/03/29 // 심규영 // 대댓글 작성 DAO
     * @param vo
     * @return
     */
    public int insertReComment(Gell_re_commentVO vo);

    // read

    /**
     * 2023/03/20 // 심규영 // 갤러리 정보 불러오기
     * 2023/03/23 // 심규영 // 갤러리 정보 불러오기 조건(grade) 추가
     * @param gell_address
     * @return
     */
    public galleryVO selectGellInfo(@Param("gell_address") String gell_address, @Param("grade") String grade);

    /**
     * 2023/03/24 // 심규영 // 갤러리 부매니저 정보 가져오기
     * @param gell_num
     * @return
     */
    public List<Gell_sub_managerVO> selectSubManagerInfo(@Param("gell_num") int gell_num);

    /**
     * 2023/03/23 // 심규영 // 갤러리 게시물 리스트 가져오기
     * @param data
     * @return
     */
    public List<gell_articleVO> selectArticles(Map<String, String> data);

    /**
     * 2023/03/26 // 심규영 // 갤러리 게시물 가져오기
     *      사용 하는 정보
     *          article_num(no)             : 게시물 번호
     *          articlel_gel_num(gell_num)  : 해당 게시물이 있는 갤러리 번호
     * @param data
     * @return
     */
    public gell_articleVO selectArticle(Map<String, String> data);

    /**
     * 2023/03/27 // 심규영 // 갤러리 게시물 가져오기 에디터용
     * @param no
     * @return
     */
    public gell_articleVO selectArticleEditor(@Param("no") String no);

    /**
     * 2023/03/23 // 심규영 // 갤러리 게시물 리스트 총 갯수 가져오기
     * @param data
     * @return
     */
    public int selectCountArticles(Map<String, String> data);

    /**
     * 2023/03/22 // 심규영 // 갤러리 존재 유무 확인용
     * @param gell_num
     * @return
     */
    public int selectGellCheck(@Param("gell_num") String gell_num);

    /**
     * 2023/03/22 // 심규영 // 유저 존재 유무 확인용
     * @param member_uid
     * @return
     */
    public int  selectMemberCheck(@Param("member_uid") String member_uid);

    /**
     * 2023/03/22 // 심규영 // 말머리 확인용
     * @param sub_cate
     * @param gell_num
     * @return
     */
    public int selectSubCateCheck(@Param("sub_cate") String sub_cate, @Param("gell_num") String gell_num);

    /**
     * 2023/03/27 // 심규영 // 비회원 게시글 비밀번호 체크
     * @param data
     * @return
     */
    public int selectNonmemberCheck(Map<String, String> data);

    /**
     * 2023/03/29 // 심규영 // 게시물 댓글 불러오기 기능
     *      필요한 값
     *          pg          : 댓글을 불러오는 페이지
     *          article_num : 게시글 번호
     *          type        : 댓글 정렬 타입
     * @param article_num
     * @return
     */
    public List<Gell_commentVO> selectComments(@Param("article_num") int article_num,
                                               @Param("start") int start,
                                               @Param("type") String type);

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
    public int updateArticle(Map<String,String> data);

    /**
     * 2023/03/28 // 심규영 // 글 삭제 기능
     *      data 에 들어오는 값
     *          gell_num        : 갤러리 번호
     *          article_num     : 게시물 번호
     *          id              : 갤러리 주소
     *          grade           : 갤러리 종류
     *          article_uid     : 게시글 작성자 uid
     *
     *      data 에 넣는 값
     *          delete_uid      : 삭제하는 유저 uid
     * @param data
     * @return
     */
    public int updateDeleteArticle(Map<String, String> data);

    /**
     * 2023/03/29 // 심규영 // 댓글 또는 대댓글 작성시 comment 개수 증가 기능
     * @param article_num
     * @return
     */
    public int updateArticleCommentCount(@Param("article_num") String article_num);

    /**
     * 2023/03/29 // 심규영 // 댓글의 대댓글 수 증가 기능
     * @param comment_num
     * @return
     */
    public int updateCommentReCount(@Param("comment_num") String comment_num);

    // delete
}
