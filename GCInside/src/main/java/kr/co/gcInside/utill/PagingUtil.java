package kr.co.gcInside.utill;


/**
 * 페이징 처리 도구
 * @since 2023/02/09 // 심규영 // 페이징 처리 도구 생성
 */
public class PagingUtil {

    /**
     * 페이지 시작값 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param currntPage 현재 페이지
     * @return int // 페이지 시작값
     */
    public int getLimitStart(int currntPage) {
        return (currntPage - 1) * 10;
    }

    /**
     * 현재 페이지 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param pg // 현재 페이지 값(String)
     * @return int // 현재 페이지
     */
    public int getCurrentPage(String pg) {
        int currnetPage = 1;

        if(pg != null && pg != "") currnetPage = Integer.parseInt(pg);

        return currnetPage;
    }

    /**
     * 마지막 페이지 번호 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param total // 게시물 전체 갯수
     * @return int // 마지막 페이지 번호 리턴
     */
    public int getLastPageNum(int total) {
        int lastPage = 0;

        if(total == 0) return 1;

        if (total % 10 == 0) {
            lastPage = (int) (total / 10);
        } else {
            lastPage = (int) (total / 10) + 1;
        }

        return lastPage;
    }

    /**
     * 페이지 시작 번호 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param total 게시물 전체 갯수
     * @param start 페이지 시작 값
     * @return 페이지 시작 번호 리턴
     */
    public int getPageStartNum(int total, int start) {
        return (int) (total - start);
    }

    /**
     * 페이지 그룹 시작 번호 및 끝 번호 계산
     * @since 2023/02/09 // 심규영 // 최초작성
     * @param currentPage 현재 페이지 번호
     * @param lastPage 마지막 페이지 번호
     * @return 그룹 시작 번호, 그룹 끝 번호
     */
    public int[] getPageGroup(int currentPage, int lastPage) {
        int groupCurrent = (int) Math.ceil(currentPage / 10.0);
        int groupStart = (groupCurrent - 1) * 10 + 1;
        int groupEnd = groupCurrent * 10;

        if(groupEnd > lastPage) groupEnd = lastPage;

        int[] groups = {groupStart, groupEnd};

        return groups;
    }

    /**
     * 페이징 처리후 DTO에 담아서 리턴
     * @since 2023/02/09 // 심규영 // 최초작성
     * @return PagingDTO // 데이터 저장 객체

    public PagingDTO getPagingDTO(String pg, int total) {
        int currentPage = getCurrentPage(pg);
        int start = getLimitStart(currentPage);
        int lastPage = getLastPageNum(total);
        int pageStartNum = getPageStartNum(total, start);
        int groups[] = getPageGroup(currentPage, lastPage);

        return new PagingDTO(groups[0], groups[1], currentPage,lastPage,start);
    }
     */
}
