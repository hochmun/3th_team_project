package kr.co.gcInside.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.dto.PagingDTO;
import kr.co.gcInside.security.SecurityConfig;
import kr.co.gcInside.utill.DeduplicationUtils;
import kr.co.gcInside.utill.PagingUtil;
import kr.co.gcInside.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 2023/03/20 // 심규영 // 보드 서비스 생성
 */
@Slf4j
@Service
public class BoardService {

    /**
     * 2023/03/20 // 심규영 // board dao 연결
     */
    @Autowired
    private BoardDAO dao;

    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    private DeduplicationUtils deduplicationUtils;

    private PasswordEncoder encoder = new SecurityConfig().passwordEncoder();

    // create

    /**
     * 2023/03/22 // 심규영 // 게시물 작성 DAO
     * 2023/04/14 // 심규영 // vo로 변경
     * @param vo
     * @return
     */
    public int insertArticle(gell_articleVO vo) {
        return dao.insertArticle(vo);
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

    /**
     * 2023/04/06 // 심규영 // 추천, 비추천 기록 남기는 기능
     *<pre>       data 들어오는 값
     *          article_num         : 게시물 번호
     *          articlel_gell_num   : 게시글 갤러리 번호
     *          type                : 추천, 비추천 구분 {0:추천,1:비추천}
     *
     *      data 에 넣는 값
     *          login_type          : 로그인 상태 구분 {0:회원,1:비회원}
     *          regip               : ip 기록</pre>
     * @param data
     * @return
     */
    public int insertRecommendLog(Map<String,String> data) {
        return dao.insertRecommendLog(data);
    }

    /**
     * 2023/04/07 // 심규영 // 갤러리 조회 기록
     * @param gell_num
     * @return
     */
    public int insertGellHitLog(int gell_num) {
        return dao.insertGellHitLog(gell_num);
    }

    /**
     * 2023/04/13 // 심규영 // 파일 등록 기능
     * @param vo
     * @return
     */
    public int insertArticleFile(Gell_fileVO vo){
        return dao.insertArticleFile(vo);
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
     *  출력 조건
     *      1. 게시글 번호 지정 해야함
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
        String encodePassword = dao.selectNonmemberCheck(data);
        return encoder.matches(data.get("pass"), encodePassword) ? 1 : 0;
    }

    /**
     * 2023/03/29 // 심규영 // 게시물 댓글 불러오기 기능
     * <pre>     댓글 리스트 출력 조건
     *          1. 댓글 페이지 당 출력 개수는 댓글, 대댓글 포함 100개 (페이징 처리 필요, mapper, 쿼리문 에서 처리)
     *          2. 삭제된 댓글은 삭제된 댓글 표시 => 삭제된 댓글의 대댓글 표시 용 (js,html 에서 처리)
     *              2-1. 삭제된 댓글은 대댓글 입력 못 하게 막아야함 (js,html 에서 처리)
     *          3. 페이지 시작 부분이 대댓글 일 수 도 있음
     *              3-1.쿼리문으로 불러 올때 중복 제거 사용? (X)
     *                  3-1-1.쿼리문으로 불러온 리스트를 서비스 단에서 처리 하는게 맞음
     *              3-2.중복이 제거 될 경우 맨앞이 대댓글이 아닌 이상 대댓글 제거 됨
     *              3-3.제거된 리스트에서 대댓글이 출력될 경우를 thymeleaf 내에서 처리 하면 됨</pre>
     *      
     * @param article_num
     * @return Map에 담기는 값<br>
     *      "reCommentVOS"  : 대댓글 리스트<br>
     *      "commentVOS"    : 댓글, 대댓글 포함 리스트, 중복 제거 됨
     */
    public Map<String,List<Gell_commentVO>> selectComments(int article_num, int start, String type) {
        Map<String, List<Gell_commentVO>> commentLists = new HashMap<>(); // 댓글 리스트와 대댓글 리스트를 담을 map

        List<Gell_commentVO> allCommentVOS = dao.selectComments(article_num, start, type); // 댓글 리스트

        /* 대댓글 리스트 */
        List<Gell_commentVO> reCommentVOS = allCommentVOS.stream()
                .filter(gellCommentVO -> gellCommentVO.getComment_type() == 1) // 대댓글인 경우만
                .collect(Collectors.toList()); // 리스트로 출력
        commentLists.put("reCommentVOS", reCommentVOS);

        /* 중복이 제거된 리스트 // 대댓글이 제외 되고 댓글 만 있는 리스트 또는 부모 댓글이 없고 대댓글만 존재 */
        List<Gell_commentVO> commentVOS = allCommentVOS.stream()
                .filter(deduplicationUtils.distinctByKey(Gell_commentVO::getComment_num)) // 중복제거
                .collect(Collectors.toList()); // 리스트 로 출력
        commentLists.put("commentVOS", commentVOS);

        return commentLists;
    }

    /**
     * 2023/04/06 // 심규영 // 추천 기록 확인 기능
     *<pre>       data 들어오는 값
     *          article_num         : 게시물 번호
     *          articlel_gell_num   : 게시글 갤러리 번호
     *          type                : 추천, 비추천 구분 {0:추천,1:비추천}
     *
     *      data 에 넣는 값
     *          login_type          : 로그인 상태 구분 {0:회원,1:비회원}
     *          regip               : ip 기록</pre>
     * @param data
     */
    public int selectCountRecommendLog(Map<String, String> data) {
        return dao.selectCountRecommendLog(data);
    }

    /**
     * 2023/04/10 // 심규영 // 댓글 비밀번호 확인
     *  data 들어오는 값
     *      password    : 비밀번호
     *      type        : 댓글, 대댓글 확인
     *      re_no       : 댓글, 대댓글 번호
     *
     *      re : 댓글일 경우 '', 대댓글 일 경우 "re_"
     * @param data
     * @return
     */
    public int selectCommentPassCheck(Map<String,String> data) {
        if(data.get("type").equals("rcmt")) data.put("re","re_");
        else data.put("re", "");

        String encodePassword = dao.selectCommentPassCheck(data);

        return encoder.matches(data.get("password"), encodePassword) ? 1 : 0;
    }

    /**
     * 2023/04/11 // 심규영 // 글 정보 가져오는 기능
     * @return
     */
    public Gell_commentVO selectCommentInfo(Map<String,String> data){
        String type = data.get("type"); // 타입 가져오기
        String re = type.equals("cmt") ? "" : "re_"; // 댓글, 대댓글 구분
        String comment_no = type.equals("cmt") ? data.get("comment_no") : data.get("re_comment_no"); // 댓글,대댓글에 따라 번호 가져오기
        return dao.selectCommentInfo(re, comment_no);
    }

    /**
     * 2023/04/17 // 심규영 // 게시글 관련 이미지 파일 불러오는 기능
     * @param article_num
     * @return
     */
    public List<Gell_fileVO> selectFiles(int article_num){
        return dao.selectFiles(article_num);
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
     * 2023/03/29 // 심규영 // 댓글 또는 대댓글 작성시 comment 개수 증가 기능<br>
     * 2023/04/11 // 심규영 // 댓글 또는 대댓글 삭제시 댓글 개수 감소 기능 추가
     * @param article_num => 게시글 번호
     * @param type => {"up","down"}
     * @return
     */
    public int updateArticleCommentCount(String article_num, String type) {
        return dao.updateArticleCommentCount(article_num, type);
    }

    /**
     * 2023/03/29 // 심규영 // 댓글의 대댓글 수 증가 기능<br>
     * 2023/04/11 // 심규영 // 대댓글 삭제시 부모 댓글의 대댓글 수 감소 기능 추가
     * @param comment_num => 부모 댓글 번호
     * @param type => {"up","down"}
     * @return
     */
    public int updateCommentReCount(String comment_num, String type) {
        return dao.updateCommentReCount(comment_num, type);
    }

    /**
     * 2023/04/05 // 심규영 // 게시물 조회수 증가 쿼리문
     * @param article_num
     * @return
     */
    public int updateArticleHitCount(int article_num) {
        return dao.updateArticleHitCount(article_num);
    }

    /**
     * 2023/04/06 // 심규영 // 게시글 추천, 비추천 증가 쿼리문
     *<pre>       data 들어오는 값
     *          article_num         : 게시물 번호
     *          articlel_gell_num   : 게시글 갤러리 번호
     *          type                : 추천, 비추천 구분 {0:추천,1:비추천}
     *
     *      data 에 넣는 값
     *          login_type          : 로그인 상태 구분 {0:회원,1:비회원}</pre>
     * @param data
     * @return
     */
    public int updateArticleRecommendCount(Map<String, String> data) {
        return dao.updateArticleRecommendCount(data);
    }

    /**
     * 2023/04/07 // 심규영 // 갤러리 조회수 증가 쿼리문
     * @param gell_num
     * @return
     */
    public int updateGellHitCount(int gell_num){
        return dao.updateGellHitCount(gell_num);
    }

    /**
     * 2023/04/07 // 심규영 // 갤러리 게시글 개수 증가 기능
     * @param gell_num
     * @return
     */
    public int updateGellArticleCount(String gell_num) {
        return dao.updateGellArticleCount(Integer.parseInt(gell_num));
    }

    /**
     * 2023/04/11 // 심규영 // 갤러리 댓글 삭제 기능
     *  data 들어오는 값
     *      type            : 댓글, 대댓글 종류 표시 {cmt:댓글, rcmt:대댓글}
     *      comment_no      : 댓글 번호 or 대댓글의 부모 번호
     *      re_comment_no   : 대댓글 번호
     *      articleNo       : 게시물 번호
     *      my              : 본인 인증 확인
     *  data 에 넣는 값
     *      re              : {"","re_"}
     * @param data
     * @return
     */
    public int updateCommentDelete(Map<String,String> data) {
        data.put("re", data.get("type").equals("cmt") ? "" : "re_");
        return dao.updateCommentDelete(data);
    }

    /**
     * 2023/04/14 // 심규영 // 게시글 작성시 관련 파일 게시글 설정 기능
     * @param url
     * @param article_num
     * @return
     */
    public int updateFileArticleNum(String url, int article_num){
        String cuttingUrl = "%"+url.substring(url.indexOf("thumb"))+"%";
        return dao.updateFileArticleNum(cuttingUrl, article_num);
    }

    /**
     * 2023/04/14 // 심규영 // 게시글 작성시 관련 파일 설정 전 null 설정 기능
     * @param article_num -> 게시글 번호
     * @return
     */
    public int updateFileArticleNumNull(int article_num){
        return dao.updateFileArticleNumNull(article_num);
    }

    /**
     * 2023/04/14 // 심규영 // 게시글 작성시 첨부 파일 개수 업데이트
     * @param article_num -> 게시글 번호
     * @param count -> 첨부파일 개수
     * @return
     */
    public int updateArticleFileCount(int article_num, int count){
        return dao.updateArticleFileCount(article_num, count);
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
        if(count == null) pagingDTO = new PagingUtil().getPagingDTO(data.get("pg"), selectCountArticles(data), "50", "15");
        else pagingDTO = new PagingUtil().getPagingDTO(data.get("pg"), selectCountArticles(data), count, "15");
        
        return pagingDTO;
    }

    /**
     * 2023/03/29 // 심규영 // 댓글 VO에 담기
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
            //commentVO.setComment_nonmember_password(data.get("comment_password"));
            commentVO.setComment_nonmember_password(encoder.encode(data.get("comment_password")));
        }

        return commentVO;
    }

    /**
     * 2023/03/29 // 심규영 // 대댓글 VO에 담기
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
            reCommentVO.setRe_comment_uid(data.get("re_comment_uid"));
        } else {
            reCommentVO.setRe_comment_nonmember_name(data.get("re_comment_nonmember_name"));
            //reCommentVO.setRe_comment_nonmember_password(data.get("re_comment_nonmember_password"));
            reCommentVO.setRe_comment_nonmember_password(encoder.encode(data.get("re_comment_nonmember_password")));
        }
        reCommentVO.setRe_comment_regip(data.get("regip"));

        return reCommentVO;
    }

    /**
     * 2023/04/14 // 심규영 // aritcleVO에 담기
     *      <p>들어오는 값</p><pre>
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
     *          sub_cate            : 말머리 번호</pre>
     * @param data
     * @return
     */
    public gell_articleVO articleVOInsert(Map<String, String> data) {
        gell_articleVO vo = new gell_articleVO();

        vo.setArticlel_gell_num(Integer.parseInt(data.get("article_gell_num")));
        vo.setArticle_login_status(Integer.parseInt(data.get("userLogin")));

        vo.setArticle_uid(data.get("article_uid"));
        vo.setArticle_nonmember_uid(data.get("nonmember_uid"));
        //vo.setArticle_nonmember_pass(data.get("nonmember_pass"));
        vo.setArticle_nonmember_pass(encoder.encode(data.get("nonmember_pass")));

        vo.setSub_cate_info(Integer.parseInt(data.get("sub_cate_info")));
        if(data.get("sub_cate_info").equals("1")) vo.setArticle_sub_cate(Integer.parseInt(data.get("sub_cate")));

        vo.setArticle_title(data.get("article_title"));
        vo.setArticle_content(data.get("article_content"));

        return vo;
    }

    /** 2023/04/12 // 심규영 // 회원 접속시 부매니저 확인 메소드 */
    public boolean UserSubManagerCheck(List<Gell_sub_managerVO> gellSubManagerVOS, String uid){
        for(Gell_sub_managerVO gellSubManagerVO : gellSubManagerVOS) {
            if(gellSubManagerVO.getSub_manager_uid().equals(uid)) return true;
        }
        return false;
    }

    /**
     * 2023/04/13 // 심규영 // 파일 업로드 기능
     * @param file -> 업로드 하는 파일
     * @param fileMap -> 저장된 파일 url 담을 맵
     */
    public int fileUpload(MultipartFile file, Map<String, Object> fileMap) {
        // 시스템 경로
        String path = new File(uploadPath).getAbsolutePath();

        // 이름 변경
        String oName = file.getOriginalFilename();
        String ext = oName.substring(oName.lastIndexOf("."));
        String nName = UUID.randomUUID().toString()+ext;

        // 날짜 구하기
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String formatedNow = now.format(formatter);
        
        // 경로 생성
        dirCreate(String.format("%s/%s/", path, formatedNow));

        // 파일 저장
        try {
            file.transferTo(new File(String.format("%s/%s/", path, formatedNow), nName));
        } catch(Exception e) {
            log.error(e.getMessage());
        }

        // Map에 이미지 경로 저장
        fileMap.put("url", "/GCInside/thumb/"+formatedNow+"/"+nName);
        
        // vo에 저장
        Gell_fileVO vo = new Gell_fileVO().builder()
                .file_ori_name(oName)
                .file_new_name(nName)
                .file_url(String.format("%s/%s/%s",path,formatedNow,nName))
                .build();
        
        // 데이터 베이스에 저장 및 결과 리턴
        return insertArticleFile(vo);
    }

    /**
     * 2023/04/17 // 심규영 // URL로 파일 다운로드 기능
     * @param urlStr
     * @param fileMap
     * @return
     */
    public int urlfileDownload(String urlStr, Map<String, Object> fileMap) {
        // 시스템 경로
        String path = new File(uploadPath).getAbsolutePath();

        // url에서 이름 가져와서 이름 변경
        String oName = urlStr.substring(urlStr.lastIndexOf("/")+1);
        String ext = oName.substring(oName.lastIndexOf(".")+1);
        String nName = UUID.randomUUID().toString()+"."+ext;

        log.info("oName : "+oName);
        log.info("ext : "+ext);
        log.info("nName : "+nName);

        // 날짜 구하기
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String formatedNow = now.format(formatter);

        // 경로 생성
        dirCreate(String.format("%s/%s/", path, formatedNow));
        File file = new File(String.format("%s/%s/", path, formatedNow), nName);

        // 파일 받기
        BufferedImage image = null;
        try {
            image = ImageIO.read(new URL(urlStr)); // 이미지 읽어오기
            ImageIO.write(image, ext, file); // 이미지 저장
        } catch (Exception e) {
            log.error("URL에서 이미지 파일 읽어오기 에러");
            log.error(e.getMessage());
        }

        // Map에 이미지 경로 저장
        fileMap.put("url", "/GCInside/thumb/"+formatedNow+"/"+nName);

        // vo에 저장
        Gell_fileVO vo = new Gell_fileVO().builder()
                .file_ori_name(oName)
                .file_new_name(nName)
                .file_url(String.format("%s/%s/%s",path,formatedNow,nName))
                .build();

        // 데이터 베이스에 저장 및 결과 리턴
        return insertArticleFile(vo);
    }

    /**
     * 2022/12/09 해당 디렉토리가 없을시 디렉토리 생성
     * @author 심규영
     * @param targetDir
     */
    public void dirCreate(String targetDir) {
        File Directory = new File(targetDir);
        if(!Directory.exists()) Directory.mkdirs();
    }

    /**
     * 2023/04/14 // 심규영 // 게시글 작성 또는 수정시 관련 이미지 정보 수정
     * @param content -> 글 내용
     * @param article_num -> 게시글 번호
     * @param mode -> 글쓰기, 글 수정 {0:글쓰기, 1:글수정}
     */
    public void imageUpdate(String content, int article_num, int mode) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String,Object> contentMap = new HashMap<>();
        int count = 0; // 이미지 파일 개수

        // 수정일 경우 진행전 이미지 파일 관련 게시글 null로 변경
        if(mode == 1) updateFileArticleNumNull(article_num);

        try {
            // 게시글 내용 String 에서 Map(key, value) 형태로 변경
            contentMap = mapper.readValue(content, Map.class);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        // 내용이 담기 blocks 분리
        ArrayList<LinkedHashMap> blocks = (ArrayList) contentMap.get("blocks");
        for(LinkedHashMap block : blocks) {
            // block을 반복 하면서 내용이 image인 block 찾기
            String type = (String) block.get("type");
            if(type.equals("image")) {
                // 이미지의 url을 추출
                String url = (String) ((LinkedHashMap)((LinkedHashMap) block.get("data")).get("file")).get("url");
                // url과 게시글 번호로 관련 파일 설정 변경
                updateFileArticleNum(url, article_num);
                // 이미지 파일 개수 증가
                count++;
            }
        }
        
        // 게시글 이미지 개수 업데이트
        // 파일이 1개 이상 있을 경우에
        if(count > 0) updateArticleFileCount(article_num, count);
    }
}
